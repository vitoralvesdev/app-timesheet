import {
  Api,
  GeneralApiProblem,
  getGeneralApiProblem,
  KindEnum,
  OrdersRequest,
  OrdersQuantityRequest,
  OrdersQuantityResponse,
  OrderRequest,
  OrderResponse,
  OrderUpdateRequest,
  OrdersResponse,
} from "@/services";
import { ApiResponse } from "apisauce";

export class OrdersApi extends Api {
  async getOrders(
    request: OrdersRequest,
  ): Promise<
    { kind: KindEnum.OK; result: OrdersResponse } | GeneralApiProblem
  > {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/v1/orders?page=${request.page}&pageSize=${request.pageSize}`, //&startDate=${request.startDate}&endDate=${request.endDate}&status=${request.status}
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return { kind: KindEnum.OK, result: response.data };
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

  async getOrder(
    request: OrderRequest,
  ): Promise<{ kind: KindEnum.OK; result: OrderResponse } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/v1/orders/${request.id}`,
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return { kind: KindEnum.OK, result: response.data };
  }

  async createOrder(
    request: OrderRequest,
  ): Promise<{ kind: KindEnum.OK; result: OrderResponse } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `/v1/orders`,
      request,
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return { kind: KindEnum.OK, result: response.data };
  }

  async startOrder(
    id: string,
    request: OrderUpdateRequest,
  ): Promise<{ kind: KindEnum.OK } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.patch(
      `/v1/orders/${id}/start`,
      request,
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return { kind: KindEnum.OK };
  }

  async endOrder(
    id: string,
    request: OrderUpdateRequest,
  ): Promise<{ kind: KindEnum.OK } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.patch(
      `/v1/orders/${id}/end`,
      request,
    );

    console.log(response.data);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return { kind: KindEnum.OK };
  }
}

export const ordersApi = new OrdersApi();
