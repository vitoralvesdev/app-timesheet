import { Box, Heading, Text, VStack } from "native-base";
import { Button, CustomModal } from "@/components";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useStores } from "src/stores";
import React, { useEffect, useState } from "react";
import {
  BackgroundCircleLoginSvg,
  BackgroundCircleLoginTwoSvg,
  GoogleSvg,
} from "@/svg";
import { USERS } from "@/services/users/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "APP_TIMESHEET_API_KEY";

export const SignIn = () => {
  const { authenticationStore } = useStores();

  const [error, setError] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });

  useEffect(() => {
    const loadData = async () => {
      await authenticationStore.loadData();
    };

    loadData().then();
  }, []);

  const onSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();
      const email = res.user.email;

      const activeUser = USERS.find((user) => user.email === email);

      if (activeUser) {
        console.log("Usuário tem conta ativa:", activeUser);

        if (res?.idToken) {
          const jsonData = JSON.stringify(activeUser.apiKey);

          await AsyncStorage.setItem(API_KEY, jsonData);
          await authenticationStore.login(res);
        }
      } else {
        setError({
          visible: true,
          message: "Usuário não possui uma conta ativa.",
        });
        console.error("Usuário não possui uma conta ativa.");
      }
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          setError({
            visible: true,
            message: "O login do usuário é obrigatório",
          });
          console.error("O login do usuário é obrigatório");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          setError({
            visible: true,
            message: "Os serviços do Google Play são necessários",
          });
          console.error("Os serviços do Google Play são necessários");
          break;
      }
    }
  };

  const renderBackground = () => {
    return (
      <>
        <Box position="absolute" top={0} zIndex={-99}>
          <BackgroundCircleLoginSvg />
        </Box>

        <Box position="absolute" bottom={0} zIndex={-99}>
          <BackgroundCircleLoginTwoSvg />
        </Box>
      </>
    );
  };

  return (
    <>
      <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
        <Heading>Olá, Seja bem vindo! 👋</Heading>

        <Text color="gray.100">Timesheet, seu controle de horas</Text>

        <Box my={5}>
          <Button
            text="Entrar com sua conta Google"
            preset="google"
            leftIcon={<GoogleSvg />}
            onPress={onSignIn}
          />
        </Box>
      </VStack>
      {renderBackground()}

      <CustomModal
        visible={error.visible}
        description={error.message}
        preset="error"
        cancelCallback={() => setError({ visible: false, message: "" })}
      />
    </>
  );
};
