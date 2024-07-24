import { TouchableOpacity, ViewStyle } from "react-native";
import { Button as ButtonNativeBase, HStack, Text } from "native-base";
import React from "react";
import { spacing, THEME } from "@/theme";
import { TouchableOpacityProps } from "react-native-gesture-handler";

type props = {
  text: string;
  preset?: "default" | "filter" | "error";
  rightIcon?: React.JSX.Element;
  onPress?: TouchableOpacityProps["onPress"];
};

export const Button = ({ preset, text, rightIcon, onPress }: props) => {
  const renderStyle = () => {
    if (preset === "filter") {
      return $filterStyle;
    }

    if (preset === "error") {
      return $errorStyle;
    }

    return $baseStyle;
  };
  return (
    <ButtonNativeBase
      size="sm"
      variant="outline"
      style={renderStyle()}
      text={text}
      onPress={onPress}
    >
      <TouchableOpacity onPress={onPress}>
        {preset === "filter" ? (
          <HStack alignItems="center">
            <Text color="gray.300" mr={2}>
              {text}
            </Text>
            {rightIcon}
          </HStack>
        ) : null}

        {!preset || preset === "default" ? (
          <HStack alignItems="center">
            <Text color="primary.100">{text}</Text>
          </HStack>
        ) : null}

        {preset === "error" ? (
          <HStack alignItems="center">
            <Text color="error.100" fontSize={spacing.md}>
              {text}
            </Text>
          </HStack>
        ) : null}
      </TouchableOpacity>
    </ButtonNativeBase>
  );
};

const $baseStyle: ViewStyle = {
  backgroundColor: THEME.colors.purple[100],
  borderColor: THEME.colors.purple[100],
  borderRadius: 5,
};

const $filterStyle: ViewStyle = {
  backgroundColor: THEME.colors.purple[400],
  borderColor: THEME.colors.purple[400],
  borderRadius: 12,
};

const $errorStyle: ViewStyle = {
  backgroundColor: THEME.colors.transparent,
  borderColor: THEME.colors.primary[200],
};
