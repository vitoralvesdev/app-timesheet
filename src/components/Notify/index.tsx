import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { NotificationContentInput } from "expo-notifications/src/Notifications.types";
import { useNavigation } from "@react-navigation/native";

const NotifyContext = createContext<
  | {
      sendPushNotification: (
        content: NotificationContentInput,
      ) => Promise<void>;
    }
  | undefined
>(undefined);

interface NotifyProviderProps {
  children: ReactNode;
}

export const NotifyProvider = ({ children }: NotifyProviderProps) => {
  const navigation = useNavigation();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
  }

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        handleRegistrationError(
          "Permission not granted to get push token for push notification!",
        );
        return;
      }
    } else {
      handleRegistrationError(
        "Must use physical device for push notifications",
      );
    }
  }

  const sendPushNotification = async (content: NotificationContentInput) => {
    await Notifications.scheduleNotificationAsync({
      content,
      trigger: {
        seconds: 2,
      },
    });
  };

  const handleNotificationClick = async (response: any) => {
    navigation.navigate("Notifications");
  };

  Notifications.addNotificationResponseReceivedListener(
    handleNotificationClick,
  );

  useEffect(() => {
    registerForPushNotificationsAsync().then();
  }, []);

  return (
    <NotifyContext.Provider value={{ sendPushNotification }}>
      {children}
    </NotifyContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotifyContext);

  if (!context) {
    throw new Error("useNotify deve ser usado dentro de um NotifyProvider");
  }
  return context.sendPushNotification;
};

export const Notify = () => {
  return <></>;
};
