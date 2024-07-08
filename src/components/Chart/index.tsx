import {Dimensions} from "react-native";
import {Box} from "native-base";
import { BarChart,  } from "react-native-gifted-charts";
import {spacing, THEME} from "@/theme";

export const Chart = () => {
    const data= [
        {
            value: 15,
            label: "Mar",
            barWidth: 24,
            barBorderTopLeftRadius: 8,
            barBorderTopRightRadius: 8,
            frontColor: THEME.colors.purple[500],
            spacing: spacing.xs,
            verticalLinesSpacing: 1,
            labelWidth: 50,
            labelTextStyle: {
                fontSize: spacing.sm,
                color: THEME.colors.gray[400],
            }
        },
        {
            value: 25,
            barWidth: 24,
            barBorderTopLeftRadius: 8,
            barBorderTopRightRadius: 8,
            frontColor: THEME.colors.purple[100],
            spacing: spacing.xxxl,
        },
        {
            value: 32,
            label: "Abr",
            barWidth: 24,
            barBorderTopLeftRadius: 8,
            barBorderTopRightRadius: 8,
            frontColor: THEME.colors.purple[500],
            spacing: spacing.xs,
            labelWidth: 50,
            labelTextStyle: {
                fontSize: spacing.sm,
                color: THEME.colors.gray[400],
            }
        },
        {
            value: 15,
            barWidth: 24,
            barBorderTopLeftRadius: 8,
            barBorderTopRightRadius: 8,
            frontColor: THEME.colors.purple[100],
            spacing: spacing.xxxl,
        },
        {
            value: 35,
            label: "Mai",
            barWidth: 24,
            barBorderTopLeftRadius: 8,
            barBorderTopRightRadius: 8,
            frontColor: THEME.colors.purple[500],
            spacing: spacing.xs,
            labelWidth: 50,
            labelTextStyle: {
                fontSize: spacing.sm,
                color: THEME.colors.gray[400],
            }
        },
        {
            value: 28,
            barWidth: 24,
            barBorderTopLeftRadius: 8,
            barBorderTopRightRadius: 8,
            frontColor: THEME.colors.purple[100],
            spacing: spacing.xxxl,
        },
    ]

    return(
        <BarChart
            data={data}
            isAnimated
            initialSpacing={10}
            adjustToWidth={true}
            yAxisThickness={0}
            maxValue={40}
            stepValue={10}
            yAxisTextStyle={{color: THEME.colors.gray[400] }}
            xAxisType={'dashed'}
            xAxisColor={'lightgray'}
            width={Dimensions.get('window').width}
        />
    )
}
