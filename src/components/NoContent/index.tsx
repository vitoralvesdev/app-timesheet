import { Box, HStack, Text } from "native-base";
import React from "react";
import { ErrorSvg } from "@/svg";
import { spacing } from "@/theme";

interface ScreenProps {
  /**
   * value to show value content
   */
  title: string;

  /**
   * value to show description content
   */
  description: string;
}

export const NoContent = ({ title, description }: ScreenProps) => {
  return (
    <Box alignItems="center" justifyContent="center" bgColor={"red"}>
      <ErrorSvg />
      <Text color="primary.500" fontSize={spacing.lg} fontWeight="bold">
        {title}
      </Text>
      <Text color="gray.300" fontSize={spacing.md}>
        {description}
      </Text>
    </Box>
  );
};
