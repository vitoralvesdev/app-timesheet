import React, { useEffect, useState } from "react";
import { Box, Text } from "native-base";
import { spacing, THEME } from "@/theme";
import { ViewStyle } from "react-native";

type props = {
  currentTime?: Date | undefined;
  onChange: (value: Date) => void;
};

export const Clock = ({ currentTime, onChange }: props) => {
  const [time, setTime] = useState<Date>(new Date());
  const _currentTime = currentTime && new Date(currentTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
      onChange(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box style={$baseStyle}>
      <Text color="gray.300" fontSize={spacing.xl}>
        {_currentTime &&
          _currentTime.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}

        {!_currentTime &&
          time.toLocaleTimeString("pt-BR", {
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
