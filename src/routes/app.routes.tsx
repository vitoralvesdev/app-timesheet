import { createNativeStackNavigator } from "react-native-screens/native-stack";
import SignIn from "@/screens/signIn";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="SignIn"
                component={SignIn}
            />
        </Navigator>
    )
}