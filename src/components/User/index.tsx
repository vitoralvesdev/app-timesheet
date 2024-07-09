import { Heading, HStack, Text, VStack } from "native-base";
import { ButtonNotification, UserPhoto } from "@/components";
import { spacing } from "@/theme";
import {useNavigation} from "@react-navigation/native";
import {AppNavigatorRoutesProps} from "@/routes/app.routes";


export const User = () => {
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const goNotifications = () => {
        navigation.navigate('Notifications')
    }

    return(
        <HStack alignItems="center">
            <UserPhoto mr={2} />
            <VStack flex={1}>
                <Text fontSize={spacing.sm} color="gray.100">Bem vindo</Text>
                <Heading fontSize={spacing.patterns.heading}>Vitor Alves</Heading>
            </VStack>
            <ButtonNotification onPress={goNotifications} />
        </HStack>
    )
}
