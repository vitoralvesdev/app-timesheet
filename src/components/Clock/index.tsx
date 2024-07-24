import React, { useEffect, useState } from "react";
import { Box, Text } from "native-base";
import { spacing, THEME } from "@/theme";
import { ViewStyle } from "react-native";

type props = {
  onChange?: (value: string) => void;
};

export const Clock = ({ onChange }: props) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box style={$baseStyle}>
      <Text color="gray.300" fontSize={spacing.xl}>
        {time.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </Box>
  );
};

const $baseStyle: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  borderColor: THEME.colors.gray[200],
  borderRadius: 24,
  borderWidth: 1,
  padding: spacing.md,
};
