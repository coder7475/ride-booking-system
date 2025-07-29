import { IncomingMessage, ServerResponse } from "node:http";

/**
 * ? Methods: get, post, put, patch, delete
 */
export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// contract for request
export interface Request {
  nodeReq: IncomingMessage;
  method: Method;
  headers: Record<string, string>;
  path: string; // actual path post/1234
  originalPath: string; // template path post/:id
  query: Record<string, string>;
  params: Record<string, string>;
  body: string | Object | null;
}

// contract for response
export interface Response {
  nodeRes: ServerResponse<IncomingMessage>;
  statusCode: number;
  headers: Record<string, string>;
  // methods
  status(code: number): this;
  setHeader(key: string, value: string): this;
  send(body?: string | Object | Buffer | null): this;
  json(body: Object): this;
  // TODO - Add more methods here
}

// contracts for handlers
export type Handler = (req: Request, res: Response) => void | Promise<void>;

export interface NextFunction {
  (error?: Error): void;
}

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void | Promise<void>;
