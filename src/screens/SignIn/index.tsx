import { Box, Heading, Text, VStack } from "native-base";
import { Button } from "@/components";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useStores } from "@/models";

// const AUTH_TOKEN = "APP_TIMESHEET_AUTH_TOKEN";

export const SignIn = () => {
  const { authenticationStore } = useStores();

  const onSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();

      if (res?.idToken) {
        authenticationStore.signIn(res);
      }
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.error("User Sign In is required");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.error("Google Play Services are needed");
          break;
      }

      console.log(error);
      console.log("Error", error.code);
    }
  };

  return (
    <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
      <Heading>Olá, Seja bem vindo! 👋</Heading>

      <Text color="gray.100">Timesheet, seu controle de horas</Text>

      <Box my={5}>
        <Button text="Entrar com sua conta Google" onPress={onSignIn} />
      </Box>
    </VStack>
  );
};
