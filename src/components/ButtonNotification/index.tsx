import {TouchableOpacity, FlexStyle, ViewStyle } from "react-native";
import { THEME } from "@/theme";
import { NotificationSvg } from "@/svg";
import {Box} from "native-base";

export const ButtonNotification = () => {
    return(
        <TouchableOpacity >
            <Box
                alignItems="center"
                borderColor="gray.200"
                borderWidth={1}
                borderRadius="full"
                justifyContent="center"
                style={{
                    width: 48,
                    height: 48,
                }}
            >
                <NotificationSvg />
            </Box>
        </TouchableOpacity>
    )
}
