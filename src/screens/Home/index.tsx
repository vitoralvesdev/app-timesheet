import { Box, HStack, useSafeArea, VStack } from "native-base";
import { User, Chart, Card, Filter } from "@/components";
import { spacing } from "@/theme";
import { UploadSvg, DownloadSvg } from "@/svg";

export const Home = () => {
    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
    });

    return(
        <Box flex={1} margin={5} {...safeAreaProps}>
            <VStack style={{ marginBottom: spacing.lg }}>
                <User />
            </VStack>

            <VStack style={{ marginBottom: spacing.md }}>
                <Filter />
            </VStack>

            <VStack style={{
                overflow: "hidden",
                marginBottom: spacing.md,
            }}>
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
        </Box>
    )
}
