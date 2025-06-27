import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { logger } from '@/server';
import { AppError } from '@/common/errors/appError';
import { APP_CODES } from '@/common/constants/appCodes';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log lỗi cho developers
  logger.error({
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  // Nếu là AppError đã được định nghĩa
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      code: error.code,
      message: error.message,
      data: null
    });
    return;
  }

  // Lỗi không xác định - trả về generic error
  const genericError = APP_CODES.INTERNAL_SERVER_ERROR;
  res.status(genericError.statusCode).json({
    code: genericError.code,
    message: genericError.message,
    data: null
  });
}; 