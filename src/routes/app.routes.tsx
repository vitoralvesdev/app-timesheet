import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Home, History, Os, Notifications} from "@/screens";
import {
    HomeSvg,
    HomeActiveSvg,
    HistorySvg,
    HistoryActiveSvg,
    OsSvg,
    OsActiveSvg
}  from "@/svg"
import { useTheme } from "native-base";
import { spacing } from "@/theme";

type AppRoutes = {
    Home: undefined
    History: undefined
    Os: undefined
    Notifications: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
    const { colors} = useTheme()

    return (
        <Navigator screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: "red"
            },
            tabBarActiveTintColor: colors.purple[200],
            tabBarStyle: {
                paddingTop: spacing.lg,
                borderTopColor:  colors.purple[300],
                borderTopWidth: 1
            },
            tabBarLabelStyle: {
                paddingTop: spacing.sm,
                fontSize: spacing.sm
            },
        }}>
            <Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Home',
                    tabBarIcon: ({focused}) => (
                        focused ? <HomeActiveSvg /> : <HomeSvg />
                    ),
                }}

            />

            <Screen
                name="History"
                component={History}
                options={{
                    title: 'Histórico',
                    tabBarIcon: ({focused}) => (
                        focused ? <HistoryActiveSvg/> : <HistorySvg />
                    ),
                }}
            />

            <Screen
                name="Os"
                component={Os}
                options={{
                    title: 'OS',
                    tabBarIcon: ({focused}) => (
                        focused ? <OsActiveSvg /> : <OsSvg />
                    ),
                }}
            />

            <Screen
                name="Notifications"
                component={Notifications}
                options={{ tabBarButton: () => null }}
            />
        </Navigator>
    )
}