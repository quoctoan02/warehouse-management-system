import {StatusCodes} from "http-status-codes";

export const APP_CODES = {
  SUCCESS: {
    code: 0,
    statusCode: StatusCodes.OK,
    message: 'Thành công'
  },
  // User errors (1000-1099)
  USER_NOT_FOUND: {
    code: 1000,
    statusCode: 404,
    message: 'Người dùng không tồn tại'
  },
  USER_ALREADY_EXISTS: {
    code: 1001,
    statusCode: 409,
    message: 'Người dùng đã tồn tại'
  },
  
  // Validation errors (1100-1199)
  INVALID_INPUT: {
    code: 1100,
    statusCode: 400,
    message: 'Dữ liệu đầu vào không hợp lệ'
  },
  INVALID_USER_ID: {
    code: 1101,
    statusCode: 400,
    message: 'ID người dùng không hợp lệ'
  },
  
  // System errors (1200-1299)
  DATABASE_ERROR: {
    code: 1200,
    statusCode: 500,
    message: 'Lỗi kết nối cơ sở dữ liệu'
  },
  INTERNAL_SERVER_ERROR: {
    code: 1201,
    statusCode: 500,
    message: 'Lỗi hệ thống'
  }
} as const;

export type AppCodeKey = keyof typeof APP_CODES;
export type AppCodeValue = typeof APP_CODES[AppCodeKey];