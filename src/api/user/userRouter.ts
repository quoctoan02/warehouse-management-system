import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/docs/openAPIResponseBuilders";
import { GetUserSchema, UserSchema } from "@/api/user/userModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./userController";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

// Register User schema
userRegistry.register("User", UserSchema);

// Schema cho Create User
const CreateUserSchema = z.object({
	body: z.object({
		name: z.string().min(1, "Tên không được để trống"),
		email: z.string().email("Email không hợp lệ"),
		age: z.number().min(1, "Tuổi phải lớn hơn 0").max(150, "Tuổi không hợp lệ")
	})
});

// Schema cho Update User
const UpdateUserSchema = z.object({
	params: z.object({ id: z.string() }),
	body: z.object({
		name: z.string().min(1).optional(),
		email: z.string().email().optional(),
		age: z.number().min(1).max(150).optional()
	})
});

// OpenAPI Documentation với numeric response codes
userRegistry.registerPath({
	method: "get",
	path: "/users",
	tags: ["User"],
	summary: "Lấy danh sách tất cả users",
	description: "Trả về danh sách tất cả users trong hệ thống với numeric response codes",
	responses: {
		...createApiResponse(z.array(UserSchema), "Danh sách users - code: 0", 200),
		404: {
			description: "Không tìm thấy users - code: 1000",
			content: {
				"application/json": {
					schema: z.object({
						code: z.literal(1000),
						message: z.string(),
						data: z.null()
					})
				}
			}
		},
		500: {
			description: "Lỗi hệ thống - code: 1200",
			content: {
				"application/json": {
					schema: z.object({
						code: z.literal(1200),
						message: z.string(),
						data: z.null()
					})
				}
			}
		}
	}
});

userRegistry.registerPath({
	method: "get",
	path: "/users/{id}",
	tags: ["User"],
	summary: "Lấy thông tin user theo ID",
	description: "Trả về thông tin chi tiết của một user với numeric response codes",
	request: { params: GetUserSchema.shape.params },
	responses: {
		...createApiResponse(UserSchema, "Thông tin user - code: 0", 200),
		400: {
			description: "ID không hợp lệ - code: 1101",
			content: {
				"application/json": {
					schema: z.object({
						code: z.literal(1101),
						message: z.string(),
						data: z.null()
					})
				}
			}
		},
		404: {
			description: "Không tìm thấy user - code: 1000",
			content: {
				"application/json": {
					schema: z.object({
						code: z.literal(1000),
						message: z.string(),
						data: z.null()
					})
				}
			}
		},
		500: {
			description: "Lỗi hệ thống - code: 1200",
			content: {
				"application/json": {
					schema: z.object({
						code: z.literal(1200),
						message: z.string(),
						data: z.null()
					})
				}
			}
		}
	}
});

userRegistry.registerPath({
	method: "post",
	path: "/users",
	tags: ["User"],
	summary: "Tạo user mới",
	description: "Tạo một user mới trong hệ thống",
	request: { body: { content: { "application/json": { schema: CreateUserSchema.shape.body } } } },
	responses: {
		201: {
			description: "Tạo user thành công - code: 0",
			content: {
				"application/json": {
					schema: z.object({
						code: z.literal(0),
						message: z.string(),
						data: UserSchema
					})
				}
			}
		}
	}
});

userRegistry.registerPath({
	method: "put",
	path: "/users/{id}",
	tags: ["User"],
	summary: "Cập nhật user",
	description: "Cập nhật thông tin user theo ID",
	request: { 
		params: UpdateUserSchema.shape.params,
		body: { content: { "application/json": { schema: UpdateUserSchema.shape.body } } }
	},
	responses: {
		...createApiResponse(UserSchema, "Cập nhật user thành công - code: 0", 200)
	}
});

userRegistry.registerPath({
	method: "delete",
	path: "/users/{id}",
	tags: ["User"],
	summary: "Xóa user",
	description: "Xóa user theo ID",
	request: { params: GetUserSchema.shape.params },
	responses: {
		200: {
			description: "Xóa user thành công - code: 0",
			content: {
				"application/json": {
					schema: z.object({
						code: z.literal(0),
						message: z.string(),
						data: z.null()
					})
				}
			}
		}
	}
});

// Routes với full CRUD operations và asyncHandler
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", validateRequest(GetUserSchema), userController.getUser);
userRouter.post("/", validateRequest(CreateUserSchema), userController.createUser);
userRouter.put("/:id", validateRequest(UpdateUserSchema), userController.updateUser);
userRouter.delete("/:id", validateRequest(GetUserSchema), userController.deleteUser);
