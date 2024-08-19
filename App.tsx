import { NativeBaseProvider } from "native-base";
import { THEME } from "@/theme/colors";
import { Routes } from "src/navigators";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { healthApi, KindEnum } from "@/services";
import { CustomModal } from "@/components";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [readApi, setReadApi] = useState(false);
  const [error, setError] = useState(false);

  const closeSplash = async () => {
    await SplashScreen.hideAsync();
  };

  const configGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId:
        "265481946936-qjrodv33qovkqihu0c4vduvhplcb9sbf.apps.googleusercontent.com",
      iosClientId:
        "265481946936-pm6jqi2t9ob636jgqsm286ps278788vf.apps.googleusercontent.com",
    });
  };

  async function getHealthApi() {
    const response = await healthApi.getHealth();

    if (response.kind !== KindEnum.OK) {
      setError(true);
      return;
    }

    if (response.kind === KindEnum.OK) {
      // setReadApi(!readApi);
    }
  }

  useEffect(() => {
    closeSplash().then();
  });

  useEffect(() => {
    configGoogleSignIn();
    getHealthApi().then();
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <Routes />

      <CustomModal
        visible={readApi}
        description="API OK"
        preset="success"
        closeCallback={() => setReadApi(!readApi)}
      />

      <CustomModal
        visible={error}
        description="Houve um erro ao se conectar com a API."
        preset="error"
        closeCallback={() => getHealthApi().then()}
        cancelCallback={() => setError(!error)}
      />
    </NativeBaseProvider>
  );
}
