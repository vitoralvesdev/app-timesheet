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
} from "@/services";
import { ApiResponse } from "apisauce";

export class OrdersApi extends Api {
  async getOrders(
    request: OrdersRequest,
  ): Promise<{ kind: KindEnum.OK } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/v1/orders?page=${request.page}&pageSize=${request.pageSize}&startDate=${request.startDate}&endDate=${request.endDate}&status=${request.status}`,
    );

    console.log(response);

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

  async getOrder(
    request: OrderRequest,
  ): Promise<{ kind: KindEnum.OK; result: OrderResponse } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/v1/orders/${request.id}`,
    );

    console.log(response);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return { kind: KindEnum.OK, result: response.data };
  }

  async createOrder(
    request: OrderRequest,
  ): Promise<{ kind: KindEnum.OK } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.post(`/v1/orders`);

    console.log(response);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return { kind: KindEnum.OK };
  }

  async startOrder(
    request: OrderUpdateRequest,
  ): Promise<{ kind: KindEnum.OK } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.put(
      `/v1/orders${request.id}/start`,
      request,
    );

    console.log(response);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return { kind: KindEnum.OK };
  }

  async endOrder(
    request: OrderUpdateRequest,
  ): Promise<{ kind: KindEnum.OK } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.put(
      `/v1/orders${request.id}/end`,
      request,
    );

    console.log(response);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return { kind: KindEnum.OK };
  }
}

export const ordersApi = new OrdersApi();
