import { ApiResponse } from "apisauce";

export enum KindEnum {
  OK = "ok",
  TIMEOUT = "timeout",
  CANNOT_CONNECT = "cannot-connect",
  INTERNAL_SERVER_ERROR = "server",
  UNKNOWN = "unknown",
  UNAUTHORIZED = "unauthorized",
  FORBIDDEN = "forbidden",
  NOT_FOUND = "not-found",
  BAD_REQUEST = "bad-request",
  REJECTED = "rejected",
}

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: KindEnum.TIMEOUT; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: KindEnum.CANNOT_CONNECT; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: KindEnum.INTERNAL_SERVER_ERROR }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: KindEnum.UNAUTHORIZED }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: KindEnum.FORBIDDEN }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: KindEnum.NOT_FOUND }
  /**
   * Bad request.  This is a 400.
   */
  | { kind: KindEnum.BAD_REQUEST; code: ""; message: "" }
  /**
   * All other 4xx series errors.
   */
  | { kind: KindEnum.REJECTED }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: KindEnum.UNKNOWN; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: KindEnum.UNKNOWN };

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(
  response: ApiResponse<any>,
): GeneralApiProblem | null {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return { kind: KindEnum.CANNOT_CONNECT, temporary: true };
    case "NETWORK_ERROR":
      return { kind: KindEnum.CANNOT_CONNECT, temporary: true };
    case "TIMEOUT_ERROR":
      return { kind: KindEnum.TIMEOUT, temporary: true };
    case "SERVER_ERROR":
      return { kind: KindEnum.INTERNAL_SERVER_ERROR };
    case "UNKNOWN_ERROR":
      return { kind: KindEnum.UNKNOWN, temporary: true };
    case "CLIENT_ERROR":
      switch (response.status) {
        case 401:
          return { kind: KindEnum.UNAUTHORIZED };
        case 403:
          return { kind: KindEnum.FORBIDDEN };
        case 404:
          return { kind: KindEnum.NOT_FOUND };
        case 400:
          return {
            kind: KindEnum.BAD_REQUEST,
            code: response.data?.errors[0].code || "",
            message: response.data?.errors[0].message || "",
          };
        default:
          return { kind: KindEnum.REJECTED };
      }
    case "CANCEL_ERROR":
      return null;
  }

  return null;
}
