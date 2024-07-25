import { Box, Heading, Text, VStack } from "native-base";
import { Button } from "@/components";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useStores } from "@/models";

export const SignIn = () => {
  const { authenticationStore } = useStores();

  const onSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();

      if (res?.idToken) {
        await authenticationStore.signIn(res);
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
