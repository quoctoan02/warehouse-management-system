import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pinoHttp from "pino-http";

import logger from "@/common/utils/logger";
import { env } from "@/common/utils/envConfig";

const getLogLevel = (status: number) => {
	if (status >= StatusCodes.INTERNAL_SERVER_ERROR) return "error";
	if (status >= StatusCodes.BAD_REQUEST) return "warn";
	return "info";
};

const addRequestId = (req: Request, res: Response, next: NextFunction) => {
	const existingId = req.headers["x-request-id"] as string;
	const requestId = existingId || randomUUID();

	// Set for downstream use
	req.headers["x-request-id"] = requestId;
	res.setHeader("X-Request-Id", requestId);

	next();
};

const httpLogger = pinoHttp({
	logger,
	genReqId: (req) => req.headers["x-request-id"] as string,
	customLogLevel: (_req, res) => getLogLevel(res.statusCode),
	customSuccessMessage: (req, res) => `${req.method} ${req.url} ${res.statusCode}`,
	customErrorMessage: (req, res) => `${req.method} ${req.url} ${res.statusCode}`,
	serializers: {
		req: (req) => ({
			method: req.method,
			url: req.url,
			id: req.id
		}),
		res: (res) => ({
			statusCode: res.statusCode
		})
	},
});

const captureResponseBody = (req: Request, res: Response, next: NextFunction) => {
	if (!env.isProduction) {
		const originalSend = res.send;
		res.send = function (body) {
			res.locals.responseBody = body;
			return originalSend.call(this, body);
		};
	}
	next();
};

export default [addRequestId, httpLogger, captureResponseBody];
