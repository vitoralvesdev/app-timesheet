import { HStack, Text } from "native-base";
import { spacing } from "@/theme";
import React from "react";
import { Button } from "../Buttons/Button";
import { ArrowDownSvg } from "@/svg";

export const Filter = () => {
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <Text fontSize={spacing.patterns.text} color="gray.100">
        Último dia
      </Text>
      <Button preset="filter" text="Diário" rightIcon={<ArrowDownSvg />} />
    </HStack>
  );
};
