import { Heading, HStack, Text, VStack } from "native-base";
import { ButtonNotification } from "../Buttons/ButtonNotification";
import { UserPhoto } from "../UserPhoto";
import { spacing } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/navigators/app.routes";
import { useStores } from "@/models";

export const User = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const {
    authenticationStore: { isName, isPhoto },
  } = useStores();

  const goNotifications = () => {
    navigation.navigate("Notifications");
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
      <ButtonNotification onPress={goNotifications} />
    </HStack>
  );
};
