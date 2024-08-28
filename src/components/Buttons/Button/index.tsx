import { TouchableOpacity, ViewStyle } from "react-native";
import { Button as ButtonNativeBase, HStack, Text } from "native-base";
import React from "react";
import { spacing, THEME } from "@/theme";
import { TouchableOpacityProps } from "react-native-gesture-handler";

type props = {
  /**
   * A value of button
   */
  text: string;

  /**
   * An item to choose button layout
   */
  preset?: "default" | "error" | "google";

  /**
   * An item to show left icon
   */
  leftIcon?: React.JSX.Element;

  /**
   * An item to show right icon
   */
  rightIcon?: React.JSX.Element;

  /**
   * item to handle button click
   */
  onPress?: TouchableOpacityProps["onPress"];
};

export const Button = ({
  preset,
  text,
  leftIcon,
  rightIcon,
  onPress,
  ...rest
}: props) => {
  const renderStyle = () => {
    // if (preset === "filter") {
    //   return $filterStyle;
    // }

    if (preset === "google") {
      return $googleStyle;
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
      {...rest}
    >
      <TouchableOpacity onPress={onPress}>
        {!preset || preset === "default" ? (
          <HStack alignItems="center">
            {leftIcon ? <HStack mr={2}>{leftIcon}</HStack> : null}
            <Text color="primary.100">{text}</Text>
            {rightIcon ? <HStack ml={2}>{rightIcon}</HStack> : null}
          </HStack>
        ) : null}

        {preset === "google" ? (
          <HStack alignItems="center">
            {leftIcon ? <HStack mr={2}>{leftIcon}</HStack> : null}
            <Text color="primary.500">{text}</Text>
            {rightIcon ? <HStack ml={2}>{rightIcon}</HStack> : null}
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

const $googleStyle: ViewStyle = {
  backgroundColor: THEME.colors.transparent,
  borderColor: THEME.colors.purple[200],
  borderRadius: 12,
};

const $errorStyle: ViewStyle = {
  backgroundColor: THEME.colors.transparent,
  borderColor: THEME.colors.primary[200],
};
