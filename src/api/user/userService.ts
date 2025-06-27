import type { User } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import logger from "@/common/utils/logger";
import { AppError } from "@/common/errors/appError";
import { APP_CODES } from "@/common/constants/appCodes";

const userRepository = new UserRepository();

// Types for request data
export interface CreateUserRequest {
	name: string;
	email: string;
	age?: number;
}

export interface UpdateUserRequest {
	name?: string;
	email?: string;
	age?: number;
}

export class UserService {
	// Lấy tất cả users
	async findAll(): Promise<User[]> {
		logger.info('Bắt đầu lấy danh sách users');
		
		const users = await userRepository.findAllAsync();
		
		if (!users || users.length === 0) {
			logger.warn('Không tìm thấy users nào trong hệ thống');
			return [];
		}

		logger.info(`Tìm thấy ${users.length} users trong hệ thống`);
		return users;
	}

	// Lấy user theo ID
	async findById(id: number): Promise<User> {
		logger.info(`Bắt đầu tìm user với ID ${id}`);
		
		const user = await userRepository.findByIdAsync(id);
		
		if (!user) {
			logger.warn(`Không tìm thấy user với ID ${id}`);
			throw new AppError('USER_NOT_FOUND');
		}

		logger.info(`Tìm thấy user ${user.name} (ID: ${id})`);
		return user;
	}

	// Validate user ID
	private validateUserId(id: string): number {
		logger.debug(`Validating user ID: ${id}`);
		
		const numericId = Number.parseInt(id, 10);
		
		if (Number.isNaN(numericId) || numericId <= 0) {
			logger.warn(`ID không hợp lệ: ${id}`);
			throw new AppError('INVALID_INPUT');
		}

		logger.debug(`ID hợp lệ: ${numericId}`);
		return numericId;
	}

	// Kiểm tra user có tồn tại không
	private async userExists(id: number): Promise<boolean> {
		logger.debug(`Kiểm tra sự tồn tại của user ID ${id}`);
		
		const user = await userRepository.findByIdAsync(id);
		const exists = !!user;
		
		logger.debug(`User ID ${id} ${exists ? 'tồn tại' : 'không tồn tại'}`);
		return exists;
	}

	// Tạo user mới
	async createUser(userData: CreateUserRequest): Promise<User> {
		logger.info('Bắt đầu tạo user mới');

		const newUser: User = {
			id: Math.floor(Math.random() * 1000) + 1,
			name: userData.name,
			email: userData.email,
			age: userData.age || 0,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		logger.info(`Tạo thành công user ${newUser.name}`);
		return newUser;
	}

	// Cập nhật user
	async updateUser(id: string, updateData: UpdateUserRequest): Promise<User> {
		const userId = this.validateUserId(id);
		logger.info(`Cập nhật user ID ${userId}`);

		const existingUser = await this.findById(userId);

		const updatedUser: User = {
			...existingUser,
			...updateData,
			updatedAt: new Date(),
		};

		logger.info(`Cập nhật thành công user ${updatedUser.name}`);
		return updatedUser;
	}

	// Xóa user
	async deleteUser(id: string): Promise<void> {
		const userId = this.validateUserId(id);
		logger.info(`Xóa user ID ${userId}`);

		const existingUser = await this.findById(userId);
		
		logger.info(`Xóa thành công user ${existingUser.name} (ID: ${userId})`);
	}
}

export const userService = new UserService();
