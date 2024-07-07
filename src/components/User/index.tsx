import { Heading, HStack, Text, VStack } from "native-base";
import UserPhoto from "@/components/UserPhoto";
import { spacing } from "@/theme";
import ButtonNotification from "@/components/ButtonNotification";

export default function User() {
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
