export interface OrdersRequest {
  page: number;
  pageSize: number;
  startDate?: string;
  endDate?: string;
  status?: OrdersStatusEnum;
}

export interface OrdersQuantityRequest {
  startDate: string;
  endDate: string;
  groupingPeriod: OrdersGroupingPeriodEnum;
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

export interface OrderRequest {
  id?: string;
  serviceDescription: string;
  companyName: string;
  companyAddressLatitude: number;
  companyAddressLongitude: number;
  schedulingDate: string;
}

export interface OrderResponse {
  id: string;
  employeeId: string;
  serviceDescription: string;
  companyName: string;
  schedulingDate: string;
  startDatetime: string;
  endDatetime: string;
  endComment: string;
  totalHours: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  status: OrdersStatusEnum;
  updatedAt: string;
  createdAt: string;
}

export interface OrderUpdateRequest {
  id?: string;
  startDatetime?: string;
  endDateTime?: string;
  recordedLatitude: number;
  recordedLongitude: number;
  comment?: string;
}

export enum OrdersGroupingPeriodEnum {
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
