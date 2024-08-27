import { addDays } from "date-fns";
import { OrdersGroupingPeriodEnum } from "@/services";
import { dateToText } from "@/helpers/formatDate";

export const rangeDate = (
  groupingPeriod: OrdersGroupingPeriodEnum,
): { endDate: string; startDate: string } => {
  const today = new Date();
  let startDate: Date;
  let endDate: Date;

  switch (groupingPeriod) {
    case OrdersGroupingPeriodEnum.YEARLY:
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = new Date(today.getFullYear(), 11, 31);
      break;
    case OrdersGroupingPeriodEnum.MONTHLY:
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      break;
    case OrdersGroupingPeriodEnum.WEEKLY:
      startDate = addDays(today, -today.getDay());
      endDate = addDays(startDate, 6);
      break;
    case OrdersGroupingPeriodEnum.DAILY:
      startDate = today;
      endDate = today;
      break;
  }

  return {
    startDate: dateToText(startDate.toString(), "yyyy-MM-dd"),
    endDate: dateToText(endDate.toString(), "yyyy-MM-dd"),
  };
};
