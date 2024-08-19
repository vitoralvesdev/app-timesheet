import React from "react";
import { Box, Heading, Text } from "native-base";
import { spacing } from "@/theme";

type props = {
  icon: React.JSX.Element;
  quantity: number;
  title: string;
};

export const Card = ({ icon, quantity, title }: props) => {
  return (
    <Box
      flex={1}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="15"
      style={{ padding: spacing.md }}
    >
      <Box
        alignItems="center"
        backgroundColor="gray.200"
        borderRadius={9}
        justifyContent="center"
        style={{
          marginBottom: spacing.sm,
          width: 48,
          height: 48,
        }}
      >
        {icon}
      </Box>

      <Heading fontSize={spacing.md}>{quantity}</Heading>
      <Text fontSize={spacing.patterns.text} color="gray.100">
        {title}
      </Text>
    </Box>
  );
};
