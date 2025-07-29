import { IncomingMessage, ServerResponse } from "node:http";

import { Response } from "./types.js";

export class ResponseImp implements Response {
  statusCode: number = 200;
  headers: Record<string, string> = {};

  constructor(public nodeRes: ServerResponse<IncomingMessage>) {}
  // methods
  status(code: number): this {
    this.statusCode = code;
    return this;
  }
  setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }
  send(body?: string | Object | Buffer | null): this {
    if (this.nodeRes.writableEnded) return this;

    if (typeof body === "object" && !(body instanceof Buffer)) {
      this.setHeader("Content-Type", "application/json");
      this.nodeRes.writeHead(this.statusCode, this.headers);
      this.nodeRes.end(JSON.stringify(body));
      return this;
    }

    if (body instanceof Buffer) {
      this.setHeader("Content-Type", "application/octet-stream");
      this.nodeRes.writeHead(this.statusCode, this.headers);
      this.nodeRes.end(body);
      return this;
    }

    this.nodeRes.writeHead(this.statusCode, this.headers);
    this.nodeRes.end(body);
    return this;
  }
  json(body: Object): this {
    this.setHeader("Content-Type", "application/json");
    this.nodeRes.writeHead(this.statusCode, this.headers);
    this.nodeRes.end(JSON.stringify(body));
    return this;
  }
  // TODO - Add more methods here
}
