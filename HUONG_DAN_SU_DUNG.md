# 🚀 HƯỚNG DẪN SỬ DỤNG 
## Express TypeScript Boilerplate 2025

### 📋 MỤC LỤC
1. [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
2. [Cài đặt và thiết lập](#cài-đặt-và-thiết-lập)
3. [Cấu hình môi trường](#cấu-hình-môi-trường)
4. [Chạy ứng dụng](#chạy-ứng-dụng)
5. [API Endpoints](#api-endpoints)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Phát triển tính năng mới](#phát-triển-tính-năng-mới)
9. [Troubleshooting](#troubleshooting)

---

### 🔧 YÊU CẦU HỆ THỐNG

#### Yêu cầu tối thiểu:
- **Node.js:** >= 18.0.0 (khuyến nghị 20.x LTS)
- **PNPM:** >= 8.0.0 (package manager)
- **Git:** >= 2.0.0
- **Docker:** >= 20.0.0 (tùy chọn - cho containerization)

#### Kiểm tra phiên bản:
```bash
node --version    # v20.x.x
pnpm --version    # 8.x.x
git --version     # git version 2.x.x
docker --version  # Docker version 20.x.x
```

---

### 📦 CÀI ĐẶT VÀ THIẾT LẬP

#### Bước 1: Clone Repository
```bash
git clone https://github.com/edwinhern/express-typescript.git
cd express-typescript
```

#### Bước 2: Cài đặt Dependencies
```bash
# Cài đặt tất cả dependencies
pnpm install

# Hoặc nếu chưa có pnpm
npm install -g pnpm
pnpm install
```

#### Bước 3: Thiết lập Environment
```bash
# Copy file template environment
cp .env.template .env

# Chỉnh sửa file .env theo nhu cầu
# (xem phần cấu hình môi trường bên dưới)
```

---

### ⚙️ CẤU HÌNH MÔI TRƯỜNG

#### Tạo file `.env`:
```bash
# Server Configuration
NODE_ENV=development
HOST=localhost
PORT=8080

# CORS Configuration
CORS_ORIGIN=http://localhost:8080

# Rate Limiting Configuration
COMMON_RATE_LIMIT_MAX_REQUESTS=1000
COMMON_RATE_LIMIT_WINDOW_MS=1000
```

#### Mô tả các biến môi trường:

| Biến | Mô tả | Giá trị mặc định | Ví dụ |
|------|-------|------------------|-------|
| `NODE_ENV` | Môi trường chạy | `production` | `development`, `production`, `test` |
| `HOST` | Địa chỉ host server | `localhost` | `0.0.0.0`, `192.168.1.100` |
| `PORT` | Port server | `8080` | `3000`, `8000` |
| `CORS_ORIGIN` | CORS allowed origins | `http://localhost:8080` | `https://myapp.com` |
| `COMMON_RATE_LIMIT_MAX_REQUESTS` | Số requests tối đa trong window | `1000` | `100`, `5000` |
| `COMMON_RATE_LIMIT_WINDOW_MS` | Thời gian window (ms) | `1000` | `60000` (1 phút) |

#### Cấu hình cho các môi trường khác nhau:

**Development:**
```bash
NODE_ENV=development
HOST=localhost
PORT=8080
CORS_ORIGIN=http://localhost:3000
COMMON_RATE_LIMIT_MAX_REQUESTS=10000
```

**Production:**
```bash
NODE_ENV=production
HOST=0.0.0.0
PORT=8080
CORS_ORIGIN=https://yourdomain.com
COMMON_RATE_LIMIT_MAX_REQUESTS=1000
COMMON_RATE_LIMIT_WINDOW_MS=60000
```

**Testing:**
```bash
NODE_ENV=test
HOST=localhost
PORT=8081
CORS_ORIGIN=http://localhost:8081
COMMON_RATE_LIMIT_MAX_REQUESTS=100000
```

---

### 🏃‍♂️ CHẠY ỨNG DỤNG

#### Development Mode (Chế độ phát triển):
```bash
# Chạy với hot reload
pnpm start:dev

# Output:
# Server (development) running on port http://localhost:8080
```

#### Production Mode (Chế độ production):
```bash
# Build và chạy production
pnpm build && pnpm start:prod

# Hoặc
pnpm run build
pnpm run start:prod
```

#### Docker (Containerized):
```bash
# Build Docker image
docker build -t express-typescript-app .

# Chạy container
docker run -p 8080:8080 --env-file .env express-typescript-app

# Hoặc với detached mode
docker run -d -p 8080:8080 --env-file .env express-typescript-app
```

#### Kiểm tra ứng dụng đã chạy:
```bash
# Kiểm tra health check
curl http://localhost:8080/health-check

# Kết quả mong đợi:
# {
#   "success": true,
#   "message": "Service is healthy",
#   "responseObject": null,
#   "statusCode": 200
# }
```

---

### 🌐 API ENDPOINTS

#### Health Check
Kiểm tra trạng thái sức khỏe của service.

```http
GET /health-check
```

**Response:**
```json
{
  "success": true,
  "message": "Service is healthy",
  "responseObject": null,
  "statusCode": 200
}
```

#### Users API

**Lấy tất cả users:**
```http
GET /users
```

**Response thành công:**
```json
{
  "success": true,
  "message": "Users found",
  "responseObject": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com",
      "age": 42,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-06T00:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Robert",
      "email": "Robert@example.com",
      "age": 21,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-06T00:00:00.000Z"
    }
  ],
  "statusCode": 200
}
```

**Lấy user theo ID:**
```http
GET /users/{id}
```

**Tham số:**
- `id` (path parameter): ID của user (số nguyên dương)

**Response thành công:**
```json
{
  "success": true,
  "message": "User found",
  "responseObject": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "age": 42,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-06T00:00:00.000Z"
  },
  "statusCode": 200
}
```

**Response lỗi (User không tồn tại):**
```json
{
  "success": false,
  "message": "User not found",
  "responseObject": null,
  "statusCode": 404
}
```

#### API Documentation
Truy cập Swagger UI để xem tài liệu API interactive:

```http
GET /swagger
```

Hoặc lấy OpenAPI specification dạng JSON:

```http
GET /swagger.json
```

#### Ví dụ sử dụng với curl:

```bash
# Lấy tất cả users
curl -X GET http://localhost:8080/users

# Lấy user có ID = 1
curl -X GET http://localhost:8080/users/1

# Với header Accept
curl -X GET \
  -H "Accept: application/json" \
  http://localhost:8080/users

# Test với invalid ID
curl -X GET http://localhost:8080/users/999
```

#### Ví dụ sử dụng với JavaScript/Fetch:

```javascript
// Lấy tất cả users
async function getAllUsers() {
  try {
    const response = await fetch('http://localhost:8080/users');
    const data = await response.json();
    
    if (data.success) {
      console.log('Users:', data.responseObject);
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Lấy user theo ID
async function getUserById(id) {
  try {
    const response = await fetch(`http://localhost:8080/users/${id}`);
    const data = await response.json();
    
    if (data.success) {
      console.log('User:', data.responseObject);
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Sử dụng
getAllUsers();
getUserById(1);
```

---

### 🧪 TESTING

#### Chạy Tests:
```bash
# Chạy tất cả tests
pnpm test

# Chạy tests với coverage report
pnpm test:cov

# Chạy tests trong watch mode (development)
pnpm test --watch

# Chạy specific test file
pnpm test src/api/user/__tests__/userService.test.ts
```

#### Test Structure:
```
src/
├── api/
│   ├── healthCheck/__tests__/
│   │   └── healthCheckRouter.test.ts
│   └── user/__tests__/
│       ├── userRouter.test.ts
│       └── userService.test.ts
├── api-docs/__tests__/
│   └── openAPIRouter.test.ts
└── common/__tests__/
    ├── errorHandler.test.ts
    └── requestLogger.test.ts
```

#### Viết Test Mới:

**Unit Test cho Service:**
```typescript
import { describe, expect, it } from 'vitest';
import { UserService } from '../userService';

describe('UserService', () => {
  const userService = new UserService();

  it('should return all users', async () => {
    const result = await userService.findAll();
    
    expect(result.success).toBe(true);
    expect(result.responseObject).toBeDefined();
    expect(Array.isArray(result.responseObject)).toBe(true);
  });

  it('should return user by id', async () => {
    const result = await userService.findById(1);
    
    expect(result.success).toBe(true);
    expect(result.responseObject?.id).toBe(1);
  });

  it('should return error for non-existent user', async () => {
    const result = await userService.findById(999);
    
    expect(result.success).toBe(false);
    expect(result.statusCode).toBe(404);
  });
});
```

**Integration Test cho Router:**
```typescript
import request from 'supertest';
import { app } from '@/server';

describe('User Router', () => {
  it('GET /users should return users list', async () => {
    const response = await request(app)
      .get('/users')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.responseObject)).toBe(true);
  });

  it('GET /users/:id should return specific user', async () => {
    const response = await request(app)
      .get('/users/1')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.responseObject.id).toBe(1);
  });
});
```

---

### 🚀 DEPLOYMENT

#### Docker Deployment:

**Build Production Image:**
```bash
# Build optimized production image
docker build -t your-app-name:latest .

# Tag cho registry
docker tag your-app-name:latest your-registry/your-app-name:v1.0.0

# Push lên registry
docker push your-registry/your-app-name:v1.0.0
```

**Docker Compose:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - PORT=8080
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - app
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

#### Cloud Deployment (ví dụ với Railway/Heroku):

**Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login và deploy
railway login
railway init
railway up
```

**Environment Variables trên Production:**
```bash
NODE_ENV=production
PORT=8080
CORS_ORIGIN=https://your-domain.com
```

#### Kubernetes Deployment:

**deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: express-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: express-app
  template:
    metadata:
      labels:
        app: express-app
    spec:
      containers:
      - name: express-app
        image: your-registry/express-app:latest
        ports:
        - containerPort: 8080
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "8080"
        livenessProbe:
          httpGet:
            path: /health-check
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
```

---

### 🔧 PHÁT TRIỂN TÍNH NĂNG MỚI

#### Tạo API Module Mới:

**Bước 1: Tạo cấu trúc thư mục**
```bash
mkdir -p src/api/product/{__tests__}
```

**Bước 2: Tạo Model (product/productModel.ts)**
```typescript
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Product = z.infer<typeof ProductSchema>;
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().positive(),
  description: z.string().optional(),
  category: z.string(),
  inStock: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const GetProductSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const CreateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    price: z.number().positive(),
    description: z.string().optional(),
    category: z.string().min(1),
    inStock: z.boolean().default(true),
  }),
});
```

**Bước 3: Tạo Repository (product/productRepository.ts)**
```typescript
import type { Product } from "./productModel";

const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    description: "High-performance laptop",
    category: "Electronics",
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class ProductRepository {
  async findAllAsync(): Promise<Product[]> {
    return products;
  }

  async findByIdAsync(id: number): Promise<Product | null> {
    return products.find((product) => product.id === id) || null;
  }

  async createAsync(productData: Partial<Product>): Promise<Product> {
    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...productData,
    } as Product;
    
    products.push(newProduct);
    return newProduct;
  }
}
```

**Bước 4: Tạo Service (product/productService.ts)**
```typescript
import { StatusCodes } from "http-status-codes";
import type { Product } from "./productModel";
import { ProductRepository } from "./productRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class ProductService {
  private productRepository: ProductRepository;

  constructor(repository: ProductRepository = new ProductRepository()) {
    this.productRepository = repository;
  }

  async findAll(): Promise<ServiceResponse<Product[] | null>> {
    try {
      const products = await this.productRepository.findAllAsync();
      if (!products || products.length === 0) {
        return ServiceResponse.failure("No Products found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Product[]>("Products found", products);
    } catch (ex) {
      const errorMessage = `Error finding all products: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving products.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: number): Promise<ServiceResponse<Product | null>> {
    try {
      const product = await this.productRepository.findByIdAsync(id);
      if (!product) {
        return ServiceResponse.failure("Product not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Product>("Product found", product);
    } catch (ex) {
      const errorMessage = `Error finding product with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding product.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const productService = new ProductService();
```

**Bước 5: Tạo Controller (product/productController.ts)**
```typescript
import type { Request, RequestHandler, Response } from "express";
import { productService } from "./productService";

class ProductController {
  public getProducts: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await productService.findAll();
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  public getProduct: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await productService.findById(id);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };
}

export const productController = new ProductController();
```

**Bước 6: Tạo Router (product/productRouter.ts)**
```typescript
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/docs/openAPIResponseBuilders";
import { GetProductSchema, ProductSchema } from "./productModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { productController } from "./productController";

export const productRegistry = new OpenAPIRegistry();
export const productRouter: Router = express.Router();

productRegistry.register("Product", ProductSchema);

productRegistry.registerPath({
  method: "get",
  path: "/products",
  tags: ["Product"],
  responses: createApiResponse(z.array(ProductSchema), "Success"),
});

productRouter.get("/", productController.getProducts);

productRegistry.registerPath({
  method: "get",
  path: "/products/{id}",
  tags: ["Product"],
  request: { params: GetProductSchema.shape.params },
  responses: createApiResponse(ProductSchema, "Success"),
});

productRouter.get("/:id", validateRequest(GetProductSchema), productController.getProduct);
```

**Bước 7: Đăng ký Router trong server.ts**
```typescript
// Thêm import
import { productRouter } from "@/api/product/productRouter";

// Thêm route
app.use("/products", productRouter);
```

**Bước 8: Cập nhật OpenAPI Generator**
```typescript
// Trong src/docs/openAPIDocumentGenerator.ts
import { productRegistry } from "@/api/product/productRouter";

export function generateOpenAPIDocument(): OpenAPIDocument {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry, 
    userRegistry,
    productRegistry // Thêm dòng này
  ]);
  // ... rest of code
}
```

#### Tạo Middleware Tùy chỉnh:

**auth/authMiddleware.ts:**
```typescript
import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ServiceResponse } from "@/common/models/serviceResponse";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const serviceResponse = ServiceResponse.failure(
      "Authorization token required",
      null,
      StatusCodes.UNAUTHORIZED
    );
    return res.status(serviceResponse.statusCode).send(serviceResponse);
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  
  try {
    // Validate token logic here
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
    
    // For demo, just mock user
    req.user = {
      id: 1,
      email: "user@example.com",
      role: "user"
    };
    
    next();
  } catch (error) {
    const serviceResponse = ServiceResponse.failure(
      "Invalid authorization token",
      null,
      StatusCodes.UNAUTHORIZED
    );
    return res.status(serviceResponse.statusCode).send(serviceResponse);
  }
};
```

**Sử dụng middleware:**
```typescript
// Trong router
import { authMiddleware } from "@/common/middleware/authMiddleware";

// Protected route
productRouter.get("/protected", authMiddleware, productController.getProducts);
```

---

### 🐛 TROUBLESHOOTING

#### Lỗi thường gặp và cách khắc phục:

**1. Port đã được sử dụng**
```
Error: listen EADDRINUSE :::8080
```
**Giải pháp:**
```bash
# Tìm process đang sử dụng port
lsof -i :8080

# Kill process
kill -9 <PID>

# Hoặc thay đổi PORT trong .env
PORT=8081
```

**2. Dependencies conflict**
```
ERR_PNPM_PEER_DEP_ISSUES
```
**Giải pháp:**
```bash
# Xóa node_modules và lock file
rm -rf node_modules pnpm-lock.yaml

# Cài đặt lại
pnpm install

# Hoặc force install
pnpm install --force
```

**3. TypeScript compilation errors**
```
error TS2307: Cannot find module '@/api/user/userService'
```
**Giải pháp:**
- Kiểm tra `tsconfig.json` paths configuration
- Restart TypeScript server trong editor
- Kiểm tra import paths

**4. Environment variables không được load**
```
Error: Invalid environment variables
```
**Giải pháp:**
```bash
# Kiểm tra file .env có tồn tại
ls -la .env

# Kiểm tra format của .env (không có spaces around =)
NODE_ENV=development  # ✅ Correct
NODE_ENV = development  # ❌ Wrong
```

**5. Rate limiting quá strict**
```
Too many requests, please try again later.
```
**Giải pháp:**
```bash
# Tăng giới hạn trong .env
COMMON_RATE_LIMIT_MAX_REQUESTS=10000
COMMON_RATE_LIMIT_WINDOW_MS=1000
```

#### Debug Tips:

**1. Enable detailed logging:**
```typescript
// Trong development, set log level
const logger = pino({ 
  name: "server start",
  level: "debug" // hoặc "trace" cho nhiều thông tin hơn
});
```

**2. Check health endpoint:**
```bash
curl -v http://localhost:8080/health-check
```

**3. Inspect request/response:**
```bash
# Với verbose output
curl -v -X GET http://localhost:8080/users

# Với timing information
curl -w "@curl-format.txt" http://localhost:8080/users
```

**4. Monitor logs:**
```bash
# Tail logs trong development
pnpm start:dev | pino-pretty

# Trong production
docker logs -f <container-name>
```

#### Performance Issues:

**1. Slow startup:**
- Check dependencies size
- Use `pnpm audit` để tìm vulnerabilities
- Consider lazy loading modules

**2. High memory usage:**
- Monitor với `process.memoryUsage()`
- Check for memory leaks với profiling tools
- Implement proper cleanup

**3. Slow API responses:**
- Add timing logs
- Profile database queries
- Implement caching
- Use connection pooling

---

### 📚 TÀI LIỆU THAM KHẢO

#### Links hữu ích:
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [OpenAPI Specification](https://swagger.io/specification/)

#### Best Practices:
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

### 💬 HỖ TRỢ

Nếu gặp vấn đề không được đề cập trong tài liệu này:

1. **Kiểm tra logs** của ứng dụng
2. **Tham khảo tài liệu** của các dependencies
3. **Tìm kiếm issues** trên GitHub repository
4. **Tạo issue mới** với thông tin chi tiết về lỗi

**Template báo lỗi:**
```
## Mô tả lỗi
[Mô tả ngắn gọn về lỗi]

## Các bước tái tạo
1. 
2. 
3. 

## Kết quả mong đợi
[Những gì bạn mong đợi sẽ xảy ra]

## Kết quả thực tế
[Những gì thực sự xảy ra]

## Môi trường
- OS: [e.g. macOS 12.0, Ubuntu 20.04]
- Node.js version: [e.g. 18.17.0]
- PNPM version: [e.g. 8.6.10]

## Logs
```
[Paste relevant logs here]
```