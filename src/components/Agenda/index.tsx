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
import { Heading, HStack, Text, VStack } from "native-base";
import { ViewStyle } from "react-native";
import { dateToText } from "@/helpers/formatDate";
import { SectionListData } from "react-native/Libraries/Lists/SectionList";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/navigators/app.routes";
import { NoContent } from "@/components";
import { ContainerLayoutOsDetailsEnum } from "@/screens/OsDetails";
import { OrdersStatusEnum } from "@/services";

type AgendaProps = {
  data: readonly SectionListData<any, any>[];
};

export const Agenda = ({ data }: AgendaProps) => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [selectedDay] = useState<string>(new Date().toString());

  LocaleConfig.locales.pt = {
    monthNames: getMonthNames(),
    monthNamesShort: getShortMonthNames(),
    dayNames: getWeekNames(),
    dayNamesShort: getShortWeekNames(),
    today: "Hoje",
  };

  LocaleConfig.defaultLocale = "pt";

  const formatItems = (items: any) => {
    const finishedItems = items.filter(
      (item) => item.status === OrdersStatusEnum.FINISHED,
    );

    const groupedData = finishedItems.reduce((acc, item) => {
      const { schedulingDate, companyName, startDateTime, endDateTime } = item;

      const hours = `${startDateTime} - ${endDateTime}`;

      if (acc[schedulingDate]) {
        acc[schedulingDate].push({ name: companyName, hours });
      } else {
        acc[schedulingDate] = [{ name: companyName, hours }];
      }

      return acc;
    }, {});

    return Object.keys(groupedData).map((date) => ({
      title: date,
      data: groupedData[date],
    }));
  };

  const goOsDetails = (layout: ContainerLayoutOsDetailsEnum) => {
    navigation.navigate("OsDetails", { containerLayout: layout });
  };

  const renderSectionHeader = (date: any) => {
    return (
      <HStack pl={5} paddingY={spacing.xxs} style={$headerStyle}>
        <Heading marginBottom={1} fontSize={spacing.lg} color="purple.200">
          {date}
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
        onDayPress={() => goOsDetails(ContainerLayoutOsDetailsEnum.Create)}
      />
      {formatItems(data).length === 0 ? renderNoContent() : null}
      <AgendaList
        sections={formatItems(data)}
        renderSectionHeader={(item) => renderSectionHeader(item)}
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
  backgroundColor: THEME.colors.purple[600],
  borderColor: THEME.colors.purple[600],
  borderRadius: 20,
  justifyContent: "space-between",
  padding: spacing.md,
};
