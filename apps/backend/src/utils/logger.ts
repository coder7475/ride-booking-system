import pino from "pino";

export const logger = pino({
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty", // for human-readable dev output
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined, // raw JSON logs for production
  level: "info", // or "debug" in dev
});
