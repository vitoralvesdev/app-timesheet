import { Box, useSafeArea } from "native-base";
import { User } from "@/components";

export const Home = () => {
    const safeAreaProps = useSafeArea({
        safeAreaTop: true
    });

    return(
        <Box flex={1} m={5} {...safeAreaProps}>
            <User />
        </Box>
    )
}
