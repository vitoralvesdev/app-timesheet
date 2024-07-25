import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { THEME } from "@/theme";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useStores } from "@/models";
import { observer } from "mobx-react-lite";

const _THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: THEME.colors.primary[100],
  },
};

const Routes = observer(() => {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores();

  console.log("is logged?", isAuthenticated);

  return (
    <NavigationContainer theme={_THEME}>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
});

export { Routes };
