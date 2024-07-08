import { ViewStyle } from "react-native"
import {Button as ButtonNativeBase, IButtonProps, HStack, Text, useTheme} from "native-base";
import React from "react";
import { THEME } from "@/theme";

type props = {
    text: string,
    preset?: "default" | "filter",
    rightIcon?: React.JSX.Element,
}

export const Button = ({ preset, text, rightIcon }: props) => {
    return(
        <ButtonNativeBase
            size="sm"
            variant="outline"
            style={[preset == "filter" ? $filterStyle : $baseStyle]}
            text={text}
        >
            { preset == "filter" ? (
                <HStack alignItems="center">
                    <Text color="gray.300" mr={2}>{text}</Text>
                    {rightIcon}
                </HStack>
            ) : null }

            { !preset || preset == "default" ? (
                <HStack alignItems="center">
                    <Text color="primary.100">{text}</Text>
                </HStack>
            ) : null }

        </ButtonNativeBase>
    )
}

const $baseStyle: ViewStyle = {
    backgroundColor: THEME.colors.purple[100],
    borderColor: THEME.colors.purple[100],
    borderRadius: 5,
}

const $filterStyle: ViewStyle = {
    backgroundColor: THEME.colors.purple[400],
    borderColor: THEME.colors.purple[400],
    borderRadius: 12,
}