import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { THEME } from "@/theme";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useStores } from "src/stores";
import { observer } from "mobx-react-lite";
import { LoadingProgress, NetworkState } from "@/components";

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

const _THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: THEME.colors.primary[100],
  },
};

const Routes = observer((props: NavigationProps) => {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores();

  return (
    <NavigationContainer theme={_THEME} {...props}>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}

      <NetworkState />
      <LoadingProgress />
    </NavigationContainer>
  );
});

export { Routes };
