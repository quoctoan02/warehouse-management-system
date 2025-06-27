import type { NextFunction, Request, Response } from "express";
import type { ZodError, ZodSchema } from "zod";
import { AppError } from "@/common/errors/appError";

export const validateRequest = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
		next();
	} catch (err) {
		// Tạo validation error với thông báo chi tiết
		const validationError = new AppError('INVALID_INPUT');
		const detailedMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
		
		// Override message với chi tiết validation
		Object.defineProperty(validationError, 'message', {
			value: detailedMessage,
			writable: false
		});
		
		next(validationError);
	}
};
