import { Heading, HStack, Text, VStack } from "native-base";
import { ButtonNotification, UserPhoto } from "@/components";
import { spacing } from "@/theme";

export const User = () => {
    return(
        <HStack alignItems="center">
            <UserPhoto mr={2} />
            <VStack flex={1}>
                <Text fontSize={spacing.sm} color="gray.100">Bem vindo</Text>
                <Heading fontSize={spacing.patterns.heading}>Vitor Alves</Heading>
            </VStack>
            <ButtonNotification />
        </HStack>
    )
}
