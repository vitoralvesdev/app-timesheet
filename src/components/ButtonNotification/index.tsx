import {TouchableOpacity, FlexStyle, ViewStyle } from "react-native";
import { THEME } from "@/theme";
import NotificationSvg from "@/svg/NotificationSvg";

export default function ButtonNotification() {
    return(
        <TouchableOpacity style={[$container, $border]}>
            <NotificationSvg />
        </TouchableOpacity>
    )
}

const $border: FlexStyle = {
    borderColor: THEME.colors.gray[200],
    borderRadius: "50%",
    borderWidth: 1,
}

const $container: ViewStyle = {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 48,
}
