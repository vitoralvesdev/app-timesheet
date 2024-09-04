import { HStack, Text } from "native-base";
import { spacing } from "@/theme";
import React, { useState } from "react";
import { ComboView } from "@/components";
import { View } from "react-native";
import { OrdersGroupingPeriodEnum } from "@/services";

const PERIODS = [
  { key: OrdersGroupingPeriodEnum.DAILY, value: "Diário" },
  { key: OrdersGroupingPeriodEnum.WEEKLY, value: "Semanal" },
  { key: OrdersGroupingPeriodEnum.MONTHLY, value: "Mensal" },
  { key: OrdersGroupingPeriodEnum.YEARLY, value: "Anual" },
];

interface FilterProps {
  /**
   * A function to be called when the selected item
   */
  onChange: (value: { key: string; value: string }) => void;
}

export const Filter = (props: FilterProps) => {
  const { onChange } = props;

  const [search, setSearch] = useState({
    key: OrdersGroupingPeriodEnum.DAILY,
    value: "Diário",
  });

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <Text fontSize={spacing.patterns.text} color="gray.100">
        Último dia
      </Text>

      <ComboView
        data={PERIODS}
        value={search}
        onChange={(item) => {
          onChange(item);
          setSearch(item);
        }}
        renderValue={(item) => <Text>{item.value}</Text>}
        renderItem={(item) => (
          <View>
            <Text>{item.value}</Text>
          </View>
        )}
      />
    </HStack>
  );
};
