import { Box, HStack, useSafeArea, VStack } from "native-base";
import {User, Chart, Card, Filter, HomeModal} from "@/components";
import { spacing } from "@/theme";
import { UploadSvg, DownloadSvg } from "@/svg";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HAS_HOME_MODAL = "@hasHomeModal"

export const Home = () => {
    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
    });

    const [modal, setModal] = useState(false)

    const onCloseModal = async () => {
        await setReadFromStorage()
    }

    const setReadFromStorage = async () => {
        try {
            await AsyncStorage.setItem(HAS_HOME_MODAL, "read")
            setModal(!modal)
        } catch (e) {
            console.log(e)
        }
    }

     const getReadFromStorage = async () => {
         const modal =  await AsyncStorage.getItem(HAS_HOME_MODAL)

         if (!modal) {
             setModal(true)
         }
    }

    useEffect(() => {
        getReadFromStorage().then()
    }, [])

    return(
        <Box flex={1} margin={5} {...safeAreaProps}>
            <VStack style={{ marginBottom: spacing.lg }}>
                <User />
            </VStack>

            <VStack style={{ marginBottom: spacing.md }}>
                <Filter />
            </VStack>

            <VStack>
                <Chart />
            </VStack>

            <HStack style={{ gap: spacing.xs }}>
                <Card
                    icon={<DownloadSvg />}
                    title="13"
                    text="OS Abertas"
                />

                <Card
                    icon={<UploadSvg />}
                    title="24"
                    text="OS Fechadas"
                />
            </HStack>

            <HomeModal
                visible={modal}
                closeCallback={onCloseModal}
            />
        </Box>
    )
}
