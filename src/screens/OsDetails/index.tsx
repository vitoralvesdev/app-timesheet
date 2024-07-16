import {useSafeArea, VStack, Text, Box, HStack} from "native-base";
import {spacing} from "@/theme";
import {Button, ButtonBack, Clock, Header, TextField} from "@/components";
import {useNavigation} from "@react-navigation/native";
import {AppNavigatorRoutesProps} from "@/navigators/app.routes";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";

interface IFormValues {
    observation: string
}

export const OsDetails = () => {
    const safeAreaProps = useSafeArea({
        safeAreaTop: true
    });

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const [osStarted, setOsStarted] = useState<boolean>(false)

    const {
        control,
    } = useForm<IFormValues>({
        mode: "onChange",
    })

    const goHistory = () => (
        <ButtonBack onPress={() => navigation.navigate('History')} />
    )

    return(
        <Box flex={1} {...safeAreaProps}>
            <VStack margin={5}  style={{ marginBottom: spacing.md }}>
                <Header
                    title="Apontamento"
                    renderButtonBack={goHistory}
                />
            </VStack>

            <VStack
                mb={spacing.xs}
                alignItems="center"
                justifyContent="center"
            >
                <Text
                    color="gray.500"
                    fontSize={spacing.md}
                    fontWeight="bold"
                >BHUT</Text>
                <Text
                    color="gray.100"
                    fontSize={spacing.md}
                >OS: 12345678</Text>
            </VStack>

            <VStack
                marginX={5}
            >
                <Text
                    mb={spacing.xxs}
                    color="gray.500"
                    fontSize={spacing.patterns.text}
                    fontWeight="bold"
                >Horário</Text>

                <VStack mb={spacing.xs}>
                    <Clock />
                </VStack>
            </VStack>

            <VStack
                marginX={5}
            >
                { !osStarted ? (
                    <Button text="Iniciar OS" onPress={() => setOsStarted(true)} />
                ) : null }

                { osStarted ? (
                        <VStack>
                            <Text
                                mb={spacing.xxs}
                                color="gray.500"
                                fontSize={spacing.patterns.text}
                                fontWeight="bold"
                            >Observação</Text>

                            <HStack
                                mb={spacing.xs}
                            >
                                <Controller
                                    name="observation"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            placeholder="Problema resolvido"
                                            value={value}
                                            onChange={(v) => onChange(v)}
                                            numberOfLines={10}
                                        />
                                    )}
                                />
                            </HStack>

                            <Button text="Finalizar OS" onPress={() => setOsStarted(false)} />
                        </VStack>
                ) : null }
            </VStack>
        </Box>
    )
}

