import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/docs/openAPIResponseBuilders";
import {logger} from "@/server";

export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter: Router = express.Router();

healthCheckRegistry.registerPath({
	method: "get",
	path: "/health-check",
	tags: ["Health Check"],
	responses: createApiResponse(z.object({ message: z.string() }), "Success"),
});

healthCheckRouter.get("/", (_req: Request, res: Response) => {
	logger.info("Health check endpoint accessed");
	res.status(200).json({ message: "Service is healthy" });
});
