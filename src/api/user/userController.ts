import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/userService";
import type { User } from "@/api/user/userModel";
import logger from "@/common/utils/logger";
import { ResponseUtil } from "@/common/utils/responseUtil";
import { asyncHandler } from "@/common/utils/asyncHandler";

class UserController {
	/**
	 * Lấy danh sách tất cả users
	 * GET /users
	 * 
	 * @param _req - Express Request
	 * @param res - Express Response
	 * @returns Response với code 0 và danh sách users
	 * @throws AppError code 1000 nếu không tìm thấy users
	 * @throws AppError code 1200 nếu có lỗi database
	 */
	public getUsers: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
		logger.info('Bắt đầu lấy danh sách users');
		
		const users: User[] = await userService.findAll();
		
		logger.info(`Tìm thấy ${users.length} users`);
		
		ResponseUtil.okWithMessage(res, 'Users retrieved successfully', users);
	});

	/**
	 * Lấy thông tin user theo ID
	 * GET /users/:id
	 * 
	 * @param req - Express Request với params.id
	 * @param res - Express Response  
	 * @returns Response với code 0 và thông tin user
	 * @throws AppError code 1101 nếu ID không hợp lệ
	 * @throws AppError code 1000 nếu không tìm thấy user
	 * @throws AppError code 1200 nếu có lỗi database
	 */
	public getUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
		const rawId = req.params.id as string;
		
		logger.info(`Bắt đầu lấy user với ID ${rawId}`);
		
		// Validate và convert ID
		const userId = Number.parseInt(rawId, 10);
		if (Number.isNaN(userId)) {
			logger.warn(`ID không hợp lệ ${rawId}`);
			ResponseUtil.error(res, 'INVALID_INPUT');
			return;
		}
		
		const user: User = await userService.findById(userId);
		
		logger.info(`Tìm thấy user ${user.name} (ID: ${userId})`);
		
		ResponseUtil.okWithMessage(res, 'User retrieved successfully', user);
	});

	/**
	 * Tạo user mới
	 * POST /users
	 */
	public createUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
		logger.info('Tạo user mới');
		
		const newUser: User = await userService.createUser(req.body);
		
		logger.info(`Tạo thành công user ${newUser.name}`);
		
		res.status(201).json({
			code: 0,
			message: 'User created successfully',
			data: newUser
		});
	});

	/**
	 * Cập nhật user
	 * PUT /users/:id
	 */
	public updateUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
		const userId = req.params.id as string;
		
		logger.info(`Cập nhật user ID ${userId}`);
		
		const updatedUser: User = await userService.updateUser(userId, req.body);
		
		logger.info(`Cập nhật thành công user ${updatedUser.name}`);
		
		ResponseUtil.okWithMessage(res, 'User updated successfully', updatedUser);
	});

	/**
	 * Xóa user
	 * DELETE /users/:id
	 */
	public deleteUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
		const userId = req.params.id as string;
		
		logger.info(`Xóa user ID ${userId}`);
		
		// Lấy thông tin user trước khi xóa để log
		const numericUserId = Number.parseInt(userId, 10);
		const existingUser = await userService.findById(numericUserId);
		
		await userService.deleteUser(userId);
		
		logger.info(`Xóa thành công user ${existingUser.name}`);
		
		ResponseUtil.okWithMessage(res, 'User deleted successfully', null);
	});
}

export const userController = new UserController();
