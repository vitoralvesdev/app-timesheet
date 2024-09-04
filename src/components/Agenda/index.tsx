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
  DateData,
  ExpandableCalendar,
  LocaleConfig,
} from "react-native-calendars";
import { spacing, THEME } from "@/theme";
import { Heading, HStack, Text, VStack } from "native-base";
import { ViewStyle } from "react-native";
import { SectionListData } from "react-native/Libraries/Lists/SectionList";
import { NoContent } from "@/components";
import { OrderResponse, OrdersResponse, OrdersStatusEnum } from "@/services";
import { dateToText } from "@/helpers/formatDate";

type AgendaProps = {
  data: readonly SectionListData<any, any>[];
  onDayPress?: (date: DateData) => void;
};

export const Agenda = ({ data, onDayPress }: AgendaProps) => {
  const [currentDay] = useState<string>(new Date().toString());

  LocaleConfig.locales.pt = {
    monthNames: getMonthNames(),
    monthNamesShort: getShortMonthNames(),
    dayNames: getWeekNames(),
    dayNamesShort: getShortWeekNames(),
    today: "Hoje",
  };

  LocaleConfig.defaultLocale = "pt";

  const formatItems = (items: OrderResponse[]) => {
    const groupedData = items.reduce((acc, item) => {
      const { createdAt, companyName, endComment, totalHours } = item;

      const hours = `${totalHours.hours}h ${totalHours.minutes}m`;

      if (acc[createdAt]) {
        acc[createdAt].push({ name: companyName, comment: endComment, hours });
      } else {
        acc[createdAt] = [{ name: companyName, comment: endComment, hours }];
      }

      return acc;
    }, {});

    return Object.keys(groupedData).map((date) => ({
      title: date,
      data: groupedData[date],
    }));
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
    const { name, comment, hours } = item.item;

    return (
      <VStack marginX={5}>
        <HStack style={$itemStyle} marginBottom={spacing.xxxs}>
          <VStack>
            <Text fontSize={spacing.md} color="primary.200">
              {name}
            </Text>
            <Text fontSize={spacing.md} color="gray.200">
              {comment}
            </Text>
          </VStack>
          <Text fontSize={spacing.md} color="primary.200">
            {hours}
          </Text>
        </HStack>
      </VStack>
    );
  };

  const renderNoContent = () => {
    return (
      <VStack marginY={spacing.lg}>
        <NoContent
          title="Ops"
          description={`Nenhum histórico encontrado. \n Finalize uma OS para aparecer no histórico.`}
        />
      </VStack>
    );
  };

  return (
    <CalendarProvider date={currentDay}>
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
        onDayPress={onDayPress}
      />
      {formatItems(data).length === 0 ? renderNoContent() : null}
      <AgendaList
        keyExtractor={(item) => item.id}
        sections={formatItems(data)}
        renderSectionHeader={(item) => renderSectionHeader(item as string)}
        renderItem={(item) => renderItem(item)}
      />
    </CalendarProvider>
  );
};

const $borderStyle: ViewStyle = {
  borderBottomWidth: 1,
  borderColor: THEME.colors.gray[700],
};

const $headerStyle: ViewStyle = {
  backgroundColor: THEME.colors.primary[200],
};

const $itemStyle: ViewStyle = {
  alignItems: "center",
  backgroundColor: THEME.colors.purple[600],
  borderColor: THEME.colors.purple[600],
  borderRadius: 20,
  justifyContent: "space-between",
  padding: spacing.md,
};
