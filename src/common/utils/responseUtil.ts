import type { Response } from 'express';
import { ApiResponse } from '@/common/models/apiResponse';
import {APP_CODES, AppCodeKey} from "@/common/constants/appCodes";

export class ResponseUtil {
  public static okWithCode<T>(res: Response, code: AppCodeKey, data: T): Response {
    const appCode = APP_CODES[code];
    return res.status(appCode.statusCode).json({
        code: appCode.code,
        message: appCode.message,
        data
    });
  }

  public static ok<T>(res: Response, data: T): Response {
    const appCode = APP_CODES.SUCCESS;
    return res.status(appCode.statusCode).json({
      code: appCode.code,
      message: appCode.message,
      data
    });
  }

    public static okWithMessage<T>(res: Response, message: string, data: T): Response {
        const appCode = APP_CODES.SUCCESS;
        return res.status(appCode.statusCode).json({
        code: appCode.code,
        message,
        data
        });
    }

  public static error<T = null>(res: Response, code: AppCodeKey, data: T | null = null): Response {
    const appCode = APP_CODES[code];
    return res.status(appCode.statusCode).json({
      code: appCode.code,
      message: appCode.message,
      data
    });
  }
}