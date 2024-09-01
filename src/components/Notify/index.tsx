import React, { createContext, useContext, ReactNode } from "react";
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

  const sendPushNotification = async (content: NotificationContentInput) => {
    await Notifications.scheduleNotificationAsync({
      content,
      trigger: {
        seconds: 2,
      },
    });
  };

  const handleNotificationClick = async (response: any) => {
    console.log("Usuário clicou na notificação", response);
    navigation.navigate("Notifications");
  };

  Notifications.addNotificationResponseReceivedListener(
    handleNotificationClick,
  );

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
