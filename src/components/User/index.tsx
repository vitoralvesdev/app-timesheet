import { Heading, HStack, Text, VStack } from "native-base";
import { ButtonLogout, ButtonNotification } from "@/components";
import { UserPhoto } from "../UserPhoto";
import { spacing } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/navigators/app.routes";
import { useStores } from "@/models";
import { observer } from "mobx-react-lite";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const User = observer(() => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const {
    authenticationStore: { isName, isPhoto, logout },
  } = useStores();

  const goNotifications = () => {
    navigation.navigate("Notifications");
  };

  const onLogout = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      await logout();
    } catch (error) {
      console.error("Erro ao deslogar", error);
    }
  };

  return (
    <HStack alignItems="center">
      <UserPhoto source={{ uri: isPhoto }} mr={2} />
      <VStack flex={1}>
        <Text fontSize={spacing.sm} color="gray.100">
          Bem vindo
        </Text>
        <Heading fontSize={spacing.patterns.heading}>{isName}</Heading>
      </VStack>
      <VStack marginX={4}>
        <ButtonNotification onPress={goNotifications} />
      </VStack>

      <VStack>
        <ButtonLogout onPress={onLogout} />
      </VStack>
    </HStack>
  );
});
