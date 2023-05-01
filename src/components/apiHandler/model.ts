export interface IRequestSchema {
  endPoint: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  payload?: any;
  bearerAuth?: string;
}
