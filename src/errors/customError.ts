import logger from "./logger"

export abstract class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);

    this.logError(`${new Date().toLocaleDateString()} | Error Type: ${this.name} | Status Code: ${this.statusCode} | Message: ${this.message} | Stack: ${this.stack}`);
  }

  abstract logError(logData: string): void;
}

export class NotFoundError extends CustomError {
  constructor(message: string = 'Recurso no encontrado') {
    super(message, 404);
  }

  logError(logData: string): void {
    // Cambia a logger.error para mantener consistencia con otros errores
    logger.error(logData);
  }
}

export class BadRequestError extends CustomError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }

  logError(logData: string): void {
    logger.error(logData);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }

  logError(logData: string): void {
    logger.error(logData);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }

  logError(logData: string): void {
    logger.error(logData);
  }
}

export class InternalServerError extends CustomError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }

  logError(logData: string): void {
    logger.error(logData);
  }
}
