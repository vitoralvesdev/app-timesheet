import React, { useState } from "react";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { spacing, THEME } from "@/theme";

interface ChartProps {
  openQuantity: number;
  progressQuantity: number;
  finishedQuantity: number;
}

export const Chart = ({
  openQuantity,
  progressQuantity,
  finishedQuantity,
}: ChartProps) => {
  const [data, setData] = useState([]);

  const formatData = (
    openQuantity: number = 0,
    progressQuantity: number = 0,
    finishedQuantity: number = 0,
  ) => {
    return [
      {
        value: openQuantity,
        label: "Abertas",
        barWidth: 24,
        barBorderTopLeftRadius: 8,
        barBorderTopRightRadius: 8,
        frontColor: THEME.colors.purple[500],
        spacing: spacing.lg,
        verticalLinesSpacing: 1,
        labelWidth: 50,
        labelTextStyle: {
          fontSize: spacing.sm,
          color: THEME.colors.gray[400],
        },
      },
      {
        value: 0,
        barWidth: 24,
        barBorderTopLeftRadius: 8,
        barBorderTopRightRadius: 8,
        frontColor: THEME.colors.purple[100],
        spacing: spacing.xxxl,
      },
      {
        value: progressQuantity,
        label: "Em Andamento",
        barWidth: 24,
        barBorderTopLeftRadius: 8,
        barBorderTopRightRadius: 8,
        frontColor: THEME.colors.purple[500],
        spacing: spacing.xs,
        labelWidth: 50,
        labelTextStyle: {
          fontSize: spacing.sm,
          color: THEME.colors.gray[400],
        },
      },
      {
        value: 0,
        barWidth: 24,
        barBorderTopLeftRadius: 8,
        barBorderTopRightRadius: 8,
        frontColor: THEME.colors.purple[100],
        spacing: spacing.xxxl,
      },
      {
        value: finishedQuantity,
        label: "Fechadas",
        barWidth: 24,
        barBorderTopLeftRadius: 8,
        barBorderTopRightRadius: 8,
        frontColor: THEME.colors.purple[500],
        spacing: spacing.xs,
        labelWidth: 50,
        labelTextStyle: {
          fontSize: spacing.sm,
          color: THEME.colors.gray[400],
        },
      },
      {
        value: 0,
        barWidth: 24,
        barBorderTopLeftRadius: 8,
        barBorderTopRightRadius: 8,
        frontColor: THEME.colors.purple[100],
        spacing: spacing.xxxl,
      },
    ];
  };

  return (
    <>
      {data ? (
        <BarChart
          data={formatData(openQuantity, progressQuantity, finishedQuantity)}
          isAnimated
          initialSpacing={10}
          adjustToWidth={true}
          yAxisThickness={0}
          maxValue={Math.max(...data.map((d) => d.value), 10)}
          stepValue={10}
          yAxisTextStyle={{ color: THEME.colors.gray[400] }}
          xAxisType={"dashed"}
          xAxisColor={"lightgray"}
          width={Dimensions.get("window").width}
        />
      ) : null}
    </>
  );
};
