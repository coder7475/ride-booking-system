import { Handler, Middleware, Request, Response } from "./types.js";

/**
 * - Global Middleware
 * - Route Middleware: path
 */
type MiddlewareEntry = {
  path?: string;
  middleware: Middleware;
};

export class MiddlewareManager {
  private middlewares: MiddlewareEntry[] = [];

  use(pathOrMiddleware: string | Middleware, middleware?: Middleware) {
    // Route Level Middleware
    if (typeof pathOrMiddleware === "string") {
      if (!middleware) return;
      this.middlewares.push({
        path: pathOrMiddleware,
        middleware,
      });
      return;
    }

    // Global middleware
    this.middlewares.push({ middleware: pathOrMiddleware });
  }

  registerRoutes(path: string, middlewares: Middleware[]) {
    if (middlewares.length > 0) {
      middlewares.forEach((middleware) => {
        this.use(path, middleware);
      });
    }
  }

  async execute(req: Request, res: Response, finalHandler: Handler) {
    let index = 0;
    const next = async (error?: Error) => {
      if (error) {
        res.status(500).send(error.message);
        return;
      }

      if (res.nodeRes.writableEnded) return;

      if (index >= this.middlewares.length) {
        await finalHandler(req, res);
        return;
      }

      const entry = this.middlewares[index++];
      if (!entry) {
        await next();
        return;
      }
      const { path, middleware } = entry;

      if (path && !req.originalPath.startsWith(path)) {
        await next();
        return;
      }

      await middleware(req, res, (err?: Error) => next());
    };

    await next();
  }
}
