import { createNativeStackNavigator, NativeStackNavigationProp } from "react-native-screens/native-stack";
import SignIn from "src/screens/SignIn";

type AuthRoutes = {
    SignIn: undefined
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="SignIn" component={SignIn} />
        </Navigator>
    )
}