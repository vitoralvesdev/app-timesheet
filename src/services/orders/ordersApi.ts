import {
  Api,
  GeneralApiProblem,
  getGeneralApiProblem,
  KindEnum,
  OrdersQuantityRequest,
  OrdersQuantityResponse,
} from "@/services";
import { ApiResponse } from "apisauce";

export class OrdersApi extends Api {
  async getOrders(): Promise<{ kind: KindEnum.OK } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.get(`/v1/orders`);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return { kind: KindEnum.OK };
  }

  async getOrdersQuantity(
    request: OrdersQuantityRequest,
  ): Promise<
    { kind: KindEnum.OK; result: OrdersQuantityResponse } | GeneralApiProblem
  > {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/v1/orders/quantity?startDate=${request.startDate}&endDate=${request.endDate}&groupingPeriod=${request.groupingPeriod}&status=${request.status}`,
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return { kind: KindEnum.OK, result: response.data };
  }
}

export const ordersApi = new OrdersApi();
