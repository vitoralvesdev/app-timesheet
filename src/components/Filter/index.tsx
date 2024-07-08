import { HStack, Text } from "native-base";
import {spacing} from "@/theme";
import React from "react";
import { Button } from "@/components";
import {ArrowDownSvg} from "@/svg";

export const Filter = () => {
    return(
        <HStack alignItems="center" justifyContent="space-between">
            <Text fontSize={spacing.patterns.text} color="gray.100">Últimos 90 dias</Text>
            <Button
                preset="filter"
                text="Mensal"
                rightIcon={<ArrowDownSvg />}
            />
        </HStack>
    )
}
