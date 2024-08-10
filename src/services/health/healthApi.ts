import {
  Api,
  GeneralApiProblem,
  getGeneralApiProblem,
  KindEnum,
} from "@/services";
import { ApiResponse } from "apisauce";

export class HealthApi extends Api {
  async getHealth(): Promise<{ kind: KindEnum.OK } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.get(`/v1/health`);

    if (!response) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return { kind: KindEnum.OK };
  }
}

export const healthApi = new HealthApi();
