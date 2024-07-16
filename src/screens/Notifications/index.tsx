import {Box, HStack, ScrollView, Text, useSafeArea, VStack} from "native-base";
import {Button, Header} from "@/components";
import {spacing} from "@/theme";
import {TouchableOpacity} from "react-native";

const DATA = [
    {
        title: "",
        subTitle: "Nova OS aberta para BHUT",
        hours: "8h",
        finishButton: false
    },
    {
        title: "OS 123456 - Em andamento",
        subTitle: "A OS 123456 está em andamento, não deixe de fechar ao finalizar o atendimento",
        hours: "14h",
        finishButton: true
    },
    {
        title: "",
        subTitle: "Nova OS aberta para BHUT",
        hours: "16h",
        finishButton: false
    },
    {
        title: "",
        subTitle: "Nova OS aberta para Bepay",
        hours: "16h",
        finishButton: false
    },
]

export const Notifications = () => {
    const safeAreaProps = useSafeArea({
        safeAreaTop: true
    });

    return(
        <Box flex={1} {...safeAreaProps}>
            <VStack margin={5}  style={{ marginBottom: spacing.md }}>
                <Header title="Notificações" />
            </VStack>

            <ScrollView>
                { DATA.map((item, index) => (
                <TouchableOpacity
                    key={index}
                >
                    <VStack
                        borderBottomWidth={1}
                        borderBottomColor="purple.300"
                    >
                        <Box marginY={4}>
                            <HStack marginX={5} >
                                { item.title ? (
                                    <>
                                        <Text
                                            flex={1}
                                            color="gray.500"
                                            fontSize={spacing.patterns.text}
                                            fontWeight="bold"
                                        >{item.title}</Text>
                                        <Text color="gray.100">{item.hours}</Text>
                                    </>
                                ) : null }
                            </HStack>

                            <VStack marginX={5}>
                                <HStack marginY={2}>
                                    <Text
                                        flex={1}
                                        color="gray.500"
                                        numberOfLines={2}
                                    >{item.subTitle}</Text>

                                    { !item.title ? (
                                        <Text color="gray.100">{item.hours}</Text>
                                    ) : null}
                                </HStack>

                                { item.finishButton ? (
                                    <VStack  width={"25%"}>
                                        <Button text="Finalizar" />
                                    </VStack>
                                ): null }
                            </VStack>
                        </Box>
                    </VStack>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </Box>
    )
}
