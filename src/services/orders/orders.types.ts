export interface OrdersQuantityRequest {
  startDate: string;
  endDate: string;
  groupingPeriod: "YEARLY" | "MONTHLY" | "WEEKLY" | "DAILY";
  status: "OPEN" | "IN_PROGRESS" | "FINISHED";
}

export interface OrdersQuantityResponse {
  quantity: number;
  year: number;
  month: number;
  week: number;
  day: number;
  status: string;
}
