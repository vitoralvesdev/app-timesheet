import {useSafeArea, VStack, Text, Box, HStack} from "native-base";
import {spacing} from "@/theme";
import {Button, ButtonBack, Clock, CustomModal, Header, TextField} from "@/components";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {AppNavigatorRoutesProps} from "@/navigators/app.routes";
import React, {useCallback, useEffect, useState} from "react";
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
    const [success, setSuccess] = useState(false)

    const {
        control,
    } = useForm<IFormValues>({
        mode: "onChange",
    })

    const goHistory = () => {
        navigation.navigate('History')
    }

    const finishOs = () => {
        setSuccess(!success)
        goHistory()
    }

    const renderCloseOs = () => {
        return(
            <>
                <Button text="Iniciar OS" onPress={() => setOsStarted(true)} />
            </>
        )
    }

    const renderOpenOs = () => {
        return(
            <>
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

                    <Button text="Finalizar OS" onPress={() => setSuccess(true)} />
                </VStack>
            </>
        )
    }

    useFocusEffect(
        useCallback(() => {
            setOsStarted(false)
        }, []),
    )

    return(
        <Box flex={1} {...safeAreaProps}>
            <VStack margin={5}  style={{ marginBottom: spacing.md }}>
                <Header
                    title="Apontamento"
                    renderButtonBack={() =>
                        <ButtonBack onPress={goHistory} />
                    }
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
                { osStarted ? renderOpenOs() : null }
                { !osStarted ? renderCloseOs() : null }
            </VStack>

            <CustomModal
                visible={success}
                description="Apontamento efetuado"
                preset="success"
                closeCallback={finishOs}
            />

            {/*<CustomModal*/}
            {/*    visible={true}*/}
            {/*    title="Ops"*/}
            {/*    description="Parece que você não está no local correto"*/}
            {/*    preset="error"*/}
            {/*/>*/}
        </Box>
    )
}

