import { TGenericErrorResponse } from "@/types/error";
import { CastError, Error } from "mongoose";
import { ZodError } from "zod";

export const handlerZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: "Zod Validation Error",
    errorSources,
  };
};

export const handlerDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/(["'])(\\?.)*?\1/);
  const value = match ? match[0] : "";

  return {
    statusCode: 409,
    message: "Duplicate Key Error",
    errorSources: [
      {
        path: Object.keys(err.keyValue)[0]!,
        message: `${value} already exists.`,
      },
    ],
  };
};

export const handlerValidationError = (
  err: Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources = Object.values(err.errors).map((val) => ({
    path: val.path,
    message: val.message,
  }));

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};

export const handleCastError = (err: CastError): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid ObjectId",
    errorSources: [
      {
        path: err.path,
        message: `Invalid value for field: ${err.path}`,
      },
    ],
  };
};
