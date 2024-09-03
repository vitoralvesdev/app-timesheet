import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Home, History, Os, OsDetails, Notifications } from "@/screens";
import {
  HomeSvg,
  HomeActiveSvg,
  HistorySvg,
  HistoryActiveSvg,
  OsSvg,
  OsActiveSvg,
} from "@/svg";
import { spacing, THEME } from "@/theme";
import { ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum ContainerLayoutOsDetailsEnum {
  Create = 0,
  Start = 1,
  Finish = 2,
}

type AppRoutesProps = {
  Home: undefined;
  History: undefined;
  Os: undefined;
  OsDetails: {
    containerLayout: ContainerLayoutOsDetailsEnum;
    schedulingDate?: string;
  };
  Notifications: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesProps>;

export type AppStackScreenProps<T extends keyof AppRoutesProps> =
  NativeStackScreenProps<AppRoutesProps, T>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

export function AppRoutes() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: THEME.colors.purple[200],
        style: {
          paddingVertical: spacing.lg,
        },
        tabBarStyle: [$tabBar, { height: bottom + 60 }],
        tabBarItemStyle: $tabBarItem,
        // tabBarLabelStyle: {
        //     // paddingBottom: spacing.lg,
        //     fontSize: spacing.sm,
        //     // backgroundColor: "red"
        // },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? <HomeActiveSvg /> : <HomeSvg />,
        }}
      />

      <Screen
        name="History"
        component={History}
        options={{
          title: "Histórico",
          tabBarIcon: ({ focused }) =>
            focused ? <HistoryActiveSvg /> : <HistorySvg />,
        }}
      />

      <Screen
        name="Os"
        component={Os}
        options={{
          title: "OS",
          tabBarIcon: ({ focused }) => (focused ? <OsActiveSvg /> : <OsSvg />),
        }}
      />

      <Screen
        name="Notifications"
        component={Notifications}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="OsDetails"
        component={OsDetails}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}

const $tabBar: ViewStyle = {
  borderTopColor: THEME.colors.purple[200],
  borderTopWidth: 1,
  shadowColor: THEME.colors.transparent,
};

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.xxs,
  paddingBottom: spacing.xs,
};
