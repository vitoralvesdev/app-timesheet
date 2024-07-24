import React from "react";
import { Box, Text } from "native-base";
import { spacing, THEME } from "@/theme";
import { ViewStyle } from "react-native";

type props = {
  title: string;
  preset?: "default" | "active";
};

export const Chip = ({ title, preset }: props) => {
  return (
    <Box style={[preset === "active" ? $activeStyle : $baseStyle]}>
      <Text
        fontSize={spacing.patterns.text}
        color={preset === "active" ? "primary.200" : "gray.300"}
      >
        {title}
      </Text>
    </Box>
  );
};

const $baseStyle: ViewStyle = {
  backgroundColor: THEME.colors.gray[700],
  borderRadius: 16,
  padding: spacing.xs,
};

const $activeStyle: ViewStyle = {
  backgroundColor: THEME.colors.purple[200],
  borderRadius: 16,
  padding: spacing.xs,
};
