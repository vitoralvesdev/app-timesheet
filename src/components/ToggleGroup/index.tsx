import { Box, HStack, Text } from "native-base";
import React, { useState } from "react";
import { spacing, THEME } from "@/theme";
import { TouchableOpacity, ViewStyle } from "react-native";

type ToggleGroupProps = {
  items: string[];
  onChange: (value: string) => void;
};

export const ToggleGroup = (props: ToggleGroupProps) => {
  const { items, onChange, ...rest } = props;

  const [activeItem, setActiveItem] = useState(0);

  const handlePress = (item: string, index: number) => {
    setActiveItem(index);
    onChange(item);
  };

  return (
    <HStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.700"
      borderRadius="10"
      style={{
        height: 46,
      }}
    >
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={activeItem === index ? $activeStyle : $baseStyle}
          onPress={() => handlePress(item, index)}
          {...rest}
        >
          <Text color={activeItem === index ? "gray.300" : "gray.400"}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </HStack>
  );
};

const $activeStyle: ViewStyle = {
  backgroundColor: THEME.colors.primary[100],
  borderRadius: 5,
  marginHorizontal: spacing.xs,
  padding: spacing.xs,
};

const $baseStyle: ViewStyle = {
  marginHorizontal: spacing.xs,
  padding: spacing.xs,
};
