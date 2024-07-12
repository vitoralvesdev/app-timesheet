import React, { useState } from "react";
import {
  getMonthNames,
  getShortMonthNames,
  getShortWeekNames,
  getWeekNames,
} from "@/helpers/InternationalizationHelper";
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
  LocaleConfig,
} from "react-native-calendars";
import { spacing, THEME } from "@/theme";
import { Box, Heading, HStack, Text, VStack } from "native-base";
import { ViewStyle } from "react-native";
import {dateToText} from "@/helpers/formatDate";

type props = {};

export const Agenda = ({}: props) => {
  const DATA = [
    {
      title: "2024-07-09",
      data: [
        {
          name: "BHUT",
          hours: "08:00 - 12:00",
        },
        {
          name: "Bepay",
          hours: "15:30 - 17:00",
        },
        {
          name: "Ambev",
          hours: "17:30 -18:00",
        },
      ],
    },
    {
      title: "2024-07-10",
      data: [
        {
          name: "Bepay",
          hours: "15:30 - 17:00",
        },
        {
          name: "Ambev",
          hours: "17:30 -18:00",
        },
      ],
    },
    {
      title: "2024-07-11",
      data: [
        {
          name: "Bepay",
          hours: "15:30 - 17:00",
        },
        {
          name: "Ambev",
          hours: "17:30 -18:00",
        },
      ],
    },
    {
      title: "2024-07-12",
      data: [
        {
          name: "Bepay",
          hours: "15:30 - 17:00",
        },
        {
          name: "Ambev",
          hours: "17:30 -18:00",
        },
      ],
    },
  ];
  const [selectedDay, setSelectedDay] = useState<string>(new Date().toString());

  LocaleConfig.locales.pt = {
    monthNames: getMonthNames(),
    monthNamesShort: getShortMonthNames(),
    dayNames: getWeekNames(),
    dayNamesShort: getShortWeekNames(),
    today: "Hoje",
  };

  LocaleConfig.defaultLocale = "pt";

  const renderKnob = () => {
    return <Box marginY={3} w={16} h={0.5} backgroundColor="purple.200" />;
  };

  const renderSectionHeader = (date: string) => {
    return (
      <HStack pl={5} paddingY={spacing.xxs} style={$headerStyle}>
        <Heading marginBottom={1} fontSize={spacing.lg} color="purple.200">
          {dateToText(date)}
        </Heading>
      </HStack>
    );
  };

  const renderItem = (item: any) => {
    const { name, hours } = item.item;

    return (
      <VStack marginX={5}>
        <HStack style={$itemStyle} marginBottom={spacing.xxxs}>
          <Text fontSize={spacing.md} color="primary.200">
            {name}
          </Text>
          <Text fontSize={spacing.md} color="primary.200">
            {hours}
          </Text>
        </HStack>
      </VStack>
    );
  };

  return (
    <CalendarProvider date={selectedDay}>
      <ExpandableCalendar
        allowShadow={false}
        style={$borderStyle}
        theme={{
          arrowColor: THEME.colors.purple[200],
          textDayFontSize: spacing.md,
          selectedDayBackgroundColor: THEME.colors.gray[600],
          selectedDayTextColor: THEME.colors.purple[200],
          dayTextColor: THEME.colors.purple[200],
          todayTextColor: THEME.colors.purple[200],
          calendarBackground: THEME.colors.gray[800],
          selectedDotColor: THEME.colors.gray[600],
          agendaKnobColor: THEME.colors.purple[200],
        }}
      />
      <AgendaList
        sections={DATA}
        renderSectionHeader={(item) => renderSectionHeader(item as string)}
        renderItem={(item) => renderItem(item)}
      />
    </CalendarProvider>
  );
};

const $borderStyle: ViewStyle = {
  borderBottomWidth: 1,
  borderColor: THEME.colors.gray[700],
}

const $headerStyle: ViewStyle = {
  backgroundColor: THEME.colors.primary[200],
};

const $itemStyle: ViewStyle = {
  backgroundColor: THEME.colors.purple[600],
  borderColor: THEME.colors.purple[600],
  borderRadius: 20,
  justifyContent: "space-between",
  padding: spacing.md,
};
