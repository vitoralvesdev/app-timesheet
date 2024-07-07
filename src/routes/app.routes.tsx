import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@/screens/Home";
import History from "@/screens/History";
import Os from "@/screens/Os";
import HomeSvg from "@/svg/HomeSvg"
import HistorySvg from "@/svg/HistorySvg";
import OsSvg from "@/svg/OsSvg";
import { useTheme } from "native-base";
import { spacing } from "@/theme";
import HomeActiveSvg from "@/svg/HomeActiveSvg";
import HistoryActiveSvg from "@/svg/HistoryActiveSvg";
import OsActiveSvg from "@/svg/OsActiveSvg";


type AppRoutes = {
    Home: undefined
    History: undefined
    Os: undefined
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
        </Navigator>
    )
}