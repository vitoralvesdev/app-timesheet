import {OpaqueColorValue, TouchableOpacity, TouchableOpacityProps} from "react-native";
import Ionicons from "@expo/vector-icons/AntDesign";
import React from "react";

type props = {
    color?: string | OpaqueColorValue
    onPress: TouchableOpacityProps["onPress"]
}

export const ButtonClose = ({color,  onPress }: props) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <Ionicons
                color={color}
                name="closecircleo"
                size={22}
            />
        </TouchableOpacity>
    )
}
