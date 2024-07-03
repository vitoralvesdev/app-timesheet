import { NativeBaseProvider, VStack, Heading, Text } from 'native-base'

export default function App() {
  return (
      <NativeBaseProvider>
          <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
            <Heading>Olá, Seja bem vindo! 👋</Heading>
            <Text color={"gray.500"}>Timesheet, seu controle de horas</Text>
          </VStack>
    </NativeBaseProvider>
  );
}