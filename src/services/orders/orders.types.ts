export interface OrdersQuantityRequest {
  startDate: string;
  endDate: string;
  groupingPeriod: OrdersGroupingPeriod;
  status: OrdersStatusEnum;
}

export interface OrdersQuantityResponse {
  quantity: number;
  year: number;
  month: number;
  week: number;
  day: number;
  status: string;
}

export enum OrdersGroupingPeriod {
  YEARLY = "YEARLY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  DAILY = "DAILY",
}

export enum OrdersStatusEnum {
  OPEN = "OPEN",
  PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}
