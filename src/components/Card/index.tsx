import React from "react";
import { Box, Heading, Text } from "native-base";
import { spacing } from "@/theme";

type props = {
  icon: React.JSX.Element;
  title: string;
  text: string;
};

export const Card = ({ icon, title, text }: props) => {
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

      <Heading fontSize={spacing.md}>{title}</Heading>
      <Text fontSize={spacing.patterns.text} color="gray.100">
        {text}
      </Text>
    </Box>
  );
};
