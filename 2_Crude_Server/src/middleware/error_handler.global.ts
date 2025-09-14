import type { Request, Response, NextFunction } from "express";

export const globalErrorHandlerMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const wrappedError =
    error instanceof BaseErrorResponse
      ? error.toJson()
      : new InternalServerError(error.message).toJson();

  const { httpCode, errorPayload } = wrappedError;

  res.status(httpCode).json(errorPayload);
};

export class BaseErrorResponse {
  httpCode: number;

  message: string;
  additionalProperties: any;

  constructor(httpCode: number, message: string, additionalProperties: any) {
    this.httpCode = httpCode;
    this.message = message;
    this.additionalProperties = additionalProperties;
  }

  toJson() {
    const { httpCode, message, additionalProperties } = this;
    const errorPayload = {
      message,
      code: httpCode,
      additionalProperties,
    };
    return { httpCode, errorPayload };
  }
}

export class InternalServerError extends BaseErrorResponse {
  constructor(additionalProperties?: any) {
    super(500, "Internal Server Error", additionalProperties);
  }
}

export class BadRequestError extends BaseErrorResponse {
  constructor(
    message: string = "Bad Request",
    customCode: number = 400,
    additionalProperties?: any
  ) {
    super(400, message, additionalProperties);
  }
}
