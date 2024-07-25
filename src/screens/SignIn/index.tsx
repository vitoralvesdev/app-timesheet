import { Box, Heading, Text, VStack } from "native-base";
import { Button } from "@/components";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useStores } from "@/models";
import React, { useEffect } from "react";
import {
  BackgroundCircleLoginSvg,
  BackgroundCircleLoginTwoSvg,
  GoogleSvg,
} from "@/svg";

export const SignIn = () => {
  const { authenticationStore } = useStores();

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

      if (res?.idToken) {
        await authenticationStore.login(res);
      }
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.error("O login do usuário é obrigatório");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
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
    </>
  );
};
