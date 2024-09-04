import React, { useState } from "react";
import { Box, Text } from "native-base";
import { spacing, THEME } from "@/theme";
import { ViewStyle } from "react-native";
import { dateToText } from "@/helpers/formatDate";

interface CurrentDateProps {
  date: string;
}
export const CurrentDate = ({ date }: CurrentDateProps) => {
  console.log(date);
  return (
    <Box style={$baseStyle}>
      <Text color="gray.300" fontSize={spacing.xl}>
        {dateToText(date.toString())}
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
