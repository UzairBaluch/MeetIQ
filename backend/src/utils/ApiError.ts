class ApiError extends Error {
  statusCode: number;

  data: unknown | null;

  success: boolean;

  errors: string[];

  constructor(
    statusCode: number,
    message: string = "Something is wrong",
    errors: string[] = [],
    stackTrace: string = "",
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;

    this.errors = [...errors];
    if (stackTrace) {
      this.stack = stackTrace;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
