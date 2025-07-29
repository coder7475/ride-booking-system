import { IncomingMessage } from "node:http";
import { parse } from "node:url";

import { Method, Request } from "./types.js";

export class RequestImp implements Request {
  method: Method;
  headers: Record<string, string>;
  path: string; // actual path post/1234
  originalPath: string = ""; // template path post/:id
  query: Record<string, string>;
  params: Record<string, string> = {};
  body: string | Object | null = null;

  constructor(public nodeReq: IncomingMessage) {
    this.method = nodeReq.method as Method; // TODO - Type Cast Utility
    this.headers = nodeReq.headers as Record<string, string>;

    const parsedUrl = parse(nodeReq.url!, true);

    this.path = parsedUrl.path!;
    this.query = parsedUrl.query as Record<string, string>;
  }

  // body parse
  async parseBody() {
    const acceptedMethods = ["POST", "PUT", "PATCH"];
    if (!acceptedMethods.includes(this.method)) {
      this.body = null;
      return;
    }

    const contentType = this.headers["content-type"]?.toLowerCase();
    if (!contentType) {
      this.body = null;
      return;
    }

    const chunks: Buffer[] = [];

    // read the body buffer
    for await (const chunk of this.nodeReq) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks).toString();

    if (contentType.includes("application/json")) {
      try {
        this.body = JSON.parse(buffer);
      } catch {
        this.body = null;
      }
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      try {
        const urlEncodedData = new URLSearchParams(buffer);
        this.body = Object.fromEntries(urlEncodedData.entries());
      } catch {
        this.body = null;
      }
    } else if (contentType.includes("multipart/form")) {
      // TODO - handle multipart data
      this.body = null;
    } else if (contentType.includes("text/plain")) {
      this.body = buffer;
    } else {
      this.body = null;
    }
  }
}
