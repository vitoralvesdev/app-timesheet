import { NativeBaseProvider } from "native-base";
import { THEME } from "@/theme/colors";
import { Routes } from "src/navigators";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const closeSplash = async () => {
    await SplashScreen.hideAsync();
  };

  const configGoogleSignIn = () => {
    GoogleSignin.configure({
      // scopes: ["https://www.googleapis.com/auth/drive"],
      // offlineAccess: true,
      // forceCodeForRefreshToken: true,
      // profileImageSize: 120,
      webClientId:
        "265481946936-qjrodv33qovkqihu0c4vduvhplcb9sbf.apps.googleusercontent.com",
    });
  };

  useEffect(() => {
    closeSplash().then();
  });

  useEffect(() => {
    configGoogleSignIn();
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <Routes />
    </NativeBaseProvider>
  );
}
