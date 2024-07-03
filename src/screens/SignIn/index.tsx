import { Box, Heading, Text, VStack } from "native-base";
import Button from "@/components/Button"

export default function SignIn() {
    return(
        <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
            <Heading>Olá, Seja bem vindo! 👋</Heading>

            <Text color="gray.100">Timesheet, seu controle de horas</Text>

            <Box my={5}>
                <Button text="Entrar com sua conta Google" />
            </Box>
        </VStack>
    )
}

