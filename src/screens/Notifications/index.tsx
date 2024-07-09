import {Box, HStack, ScrollView, Text, useSafeArea, VStack} from "native-base";
import {Button, Header} from "@/components";
import {spacing} from "@/theme";

export const Notifications = () => {
    const safeAreaProps = useSafeArea({
        safeAreaTop: true
    });

    return(
        <Box flex={1} {...safeAreaProps}>
            <VStack m={5}  style={{ marginBottom: spacing.md }}>
                <Header title="Notificações" />
            </VStack>

            <ScrollView>
                <HStack
                    borderBottomWidth={1}
                    borderBottomColor="purple.300"
                    paddingY={25}
                >
                    <HStack flex={1} marginX={5}>
                        <Text
                            flex={1}
                            color="gray.500"
                            fontSize={spacing.patterns.text}
                        >Nova OS aberta para <Text fontWeight="bold">BHUT</Text></Text>
                        <Text color="gray.100">8h</Text>
                    </HStack>
                </HStack>

                <VStack
                    borderBottomWidth={1}
                    borderBottomColor="purple.300"
                    paddingY={25}
                >
                    <HStack marginX={5}>
                        <Text
                            flex={1}
                            color="gray.500"
                            fontSize={spacing.patterns.text}
                            fontWeight="bold"
                            mb={2}
                        >OS 123456 - Em andamento</Text>
                        <Text color="gray.100">14h</Text>
                    </HStack>

                    <VStack marginX={5}>
                        <Text
                            color="gray.100"
                            numberOfLines={2}
                            mb={3}
                        >A OS 123456 está em andamento, não deixe de fechar ao finalizar o atendimento</Text>
                    </VStack>

                    <VStack marginX={5} width={"25%"}>
                        <Button text="Finalizar" />
                    </VStack>
                </VStack>

                <HStack
                    borderBottomWidth={1}
                    borderBottomColor="purple.300"
                    paddingY={25}
                >
                    <HStack flex={1} marginX={5}>
                        <Text
                            flex={1}
                            color="gray.500"
                            fontSize={spacing.patterns.text}
                        >Nova OS aberta para <Text fontWeight="bold">BHUT</Text></Text>
                        <Text color="gray.100">16h</Text>
                    </HStack>
                </HStack>

                <HStack
                    borderBottomWidth={1}
                    borderBottomColor="purple.300"
                    paddingY={25}
                >
                    <HStack flex={1} marginX={5}>
                        <Text
                            flex={1}
                            color="gray.500"
                            fontSize={spacing.patterns.text}
                        >Nova OS aberta para <Text fontWeight="bold">Bepay</Text></Text>
                        <Text color="gray.100">16h</Text>
                    </HStack>
                </HStack>
            </ScrollView>
        </Box>
    )
}
