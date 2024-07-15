import {Box, HStack, Text} from "native-base";
import React, {useState} from "react";
import {spacing, THEME} from "@/theme";
import {TouchableOpacity, ViewStyle} from "react-native";

type props = {
    items: string[]
    onChange?: (value: string) => void
}

export const ToggleGroup = ({ items, onChange }: props) => {
    const [activeItem, setActiveItem] = useState(items[0]);

    return(
        <HStack
            flex={1}
            alignItems="center"
            justifyContent="center"
            backgroundColor="gray.700"
            borderRadius="10"
            style={{
                height: 46
            }}
        >
            { items.map((item, index) => (
                <TouchableOpacity
                    onPress={() => {
                        setActiveItem(item)
                        onChange && onChange(item)
                    }}
                    key={index}
                >
                    <Box
                        style={activeItem == item ? $activeStyle : $baseStyle}
                    >
                        <Text
                            color={activeItem == item ? "gray.300" : "gray.400"}
                        >{item}</Text>
                    </Box>
                </TouchableOpacity>
            ))}
        </HStack>
    )
}

const $activeStyle: ViewStyle = {
    backgroundColor: THEME.colors.primary[100],
    borderRadius: 5,
    marginHorizontal: spacing.xs,
    padding: spacing.xs,
}

const $baseStyle: ViewStyle = {
    marginHorizontal: spacing.xs,
    padding: spacing.xs,
}
