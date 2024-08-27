import { Box, Input } from "native-base";
import React from "react";
import { spacing, THEME } from "@/theme";
import { ViewStyle } from "react-native";

type props = {
  leftIcon?: React.JSX.Element;
  placeholder?: string;
  value?: string | undefined;
  onChange?: (value: string) => void;
  numberOfLines?: number;
  /**
   * Optional style to input
   */
  containerStyle?: ViewStyle;
};

export const TextField = ({
  leftIcon,
  placeholder,
  value,
  onChange,
  numberOfLines,
  containerStyle,
  ...rest
}: props) => {
  return (
    <Input
      value={value}
      style={{ ...$baseStyle, ...containerStyle }}
      flex={1}
      placeholder={placeholder ?? ""}
      fontSize={spacing.patterns.text}
      borderColor="gray.200"
      _focus={{
        borderColor: THEME.colors.gray[200],
        backgroundColor: THEME.colors.primary[200],
      }}
      borderRadius={10}
      borderWidth={1}
      leftElement={leftIcon && <Box paddingLeft={4}>{leftIcon}</Box>}
      onChangeText={onChange}
      multiline={!!numberOfLines}
      numberOfLines={numberOfLines}
      height={numberOfLines ? 132 : null}
      {...rest}
    />
  );
};

const $baseStyle: ViewStyle = {
  marginVertical: spacing.xs,
};
