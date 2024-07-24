import { NativeBaseProvider } from "native-base";
import { THEME } from "@/theme/colors";
import { Routes } from "src/navigators";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    closeSplash().then();
  });

  const closeSplash = async () => {
    await SplashScreen.hideAsync();
  };

  return (
    <NativeBaseProvider theme={THEME}>
      <Routes />
    </NativeBaseProvider>
  );
}
