import React from "react";
import { Box, Text } from "native-base";
import { spacing, THEME } from "@/theme";
import { ViewStyle } from "react-native";

type props = {
  // onChange?: (value: string) => void;
};

export const CurrentDate = ({}: props) => {
  return (
    <Box style={$baseStyle}>
      <Text color="gray.300" fontSize={spacing.xl}>
        {new Date().toString()}
      </Text>
    </Box>
  );
};

const $baseStyle: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  borderColor: THEME.colors.gray[200],
  borderRadius: 24,
  borderWidth: 1,
  padding: spacing.md,
};
