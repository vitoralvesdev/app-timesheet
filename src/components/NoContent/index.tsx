import { Box, Text, VStack } from "native-base";
import React from "react";
import { ErrorSvg } from "@/svg";
import { spacing } from "@/theme";
import { Button } from "@/components";
import { TouchableOpacityProps } from "react-native";

interface ScreenProps {
  /**
   * value to show value content
   */
  title: string;

  /**
   * value to show description content
   */
  description: string;

  /**
   * item to handle button click
   */
  onPress?: TouchableOpacityProps["onPress"];

  /**
   * value to show name button
   */
  buttonTx?: string;
}

export const NoContent = ({
  title,
  description,
  onPress,
  buttonTx,
}: ScreenProps) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <ErrorSvg />
      <Text color="primary.500" fontSize={spacing.lg} fontWeight="bold">
        {title}
      </Text>
      <Text color="gray.300" fontSize={spacing.md} textAlign="center">
        {description}
      </Text>
      {onPress ? (
        <VStack marginY={5}>
          <Button text={buttonTx ?? "Cadastrar"} onPress={onPress} />
        </VStack>
      ) : null}
    </Box>
  );
};
