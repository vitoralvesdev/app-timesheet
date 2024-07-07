import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { THEME } from "@/theme";
import { AppRoutes } from "./app.routes";

const _THEME = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: THEME.colors.primary[100],
    },
};

export function Routes() {
    return(
        <NavigationContainer theme={_THEME}>
            <AppRoutes />
        </NavigationContainer>
    )
}