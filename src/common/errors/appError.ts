import { APP_CODES, type AppCodeKey } from '@/common/constants/appCodes';

export class AppError extends Error {
  public readonly code: number;        // Numeric error code
  public readonly codeKey: string;     // String key của error
  public readonly statusCode: number;  // HTTP status code

  constructor(errorCodeKey: AppCodeKey) {
    const errorConfig = APP_CODES[errorCodeKey];
    super(errorConfig.message);
    
    this.code = errorConfig.code;       // Numeric code từ APP_CODES
    this.codeKey = errorCodeKey;        // String key
    this.statusCode = errorConfig.statusCode;
    
    Error.captureStackTrace(this, this.constructor);
  }
}


// import {APP_CODES, type AppCodeKey, AppCodeValue} from '@/common/constants/appCodes';
//
// export class AppError extends Error {
//   public readonly code: number;        // Numeric error code
//   public readonly statusCode: number;  // HTTP status code
//
//   constructor(errorValue: AppCodeValue) {
//     super(errorValue.message);
//
//     this.code = errorValue.code;       // Numeric code từ APP_CODES
//     this.statusCode = errorValue.statusCode;
//
//     Error.captureStackTrace(this, this.constructor);
//   }
// }