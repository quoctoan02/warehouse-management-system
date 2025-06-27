# 🚀 HƯỚNG DẪN SỬ DỤNG NGẮN GỌN
## Express TypeScript Boilerplate 2025

### ⚡ KHỞI ĐỘNG NHANH

#### 1. Cài đặt:
```bash
# Clone và cài đặt
git clone https://github.com/edwinhern/express-typescript.git
cd express-typescript
pnpm install

# Thiết lập environment
cp .env.template .env
```

#### 2. Chạy ứng dụng:
```bash
# Development mode
pnpm start:dev

# Production mode
pnpm build && pnpm start:prod

# Docker
docker build -t app . && docker run -p 8080:8080 app
```

#### 3. Kiểm tra:
- Health check: http://localhost:8080/health-check
- API docs: http://localhost:8080/swagger
- Users API: http://localhost:8080/users

### 🔧 CẤU HÌNH MÔI TRƯỜNG

**File `.env` cơ bản:**
```bash
NODE_ENV=development
HOST=localhost
PORT=8080
CORS_ORIGIN=http://localhost:8080
COMMON_RATE_LIMIT_MAX_REQUESTS=1000
COMMON_RATE_LIMIT_WINDOW_MS=1000
```

### 🌐 API CHÍNH

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `/health-check` | GET | Kiểm tra sức khỏe service |
| `/users` | GET | Lấy danh sách users |
| `/users/:id` | GET | Lấy user theo ID |
| `/swagger` | GET | API documentation |

**Ví dụ response:**
```json
{
  "success": true,
  "message": "Users found",
  "responseObject": [...],
  "statusCode": 200
}
```

### 🧪 TESTING

```bash
# Chạy tests
pnpm test

# Test với coverage
pnpm test:cov

# Linting và formatting
pnpm lint
pnpm format
```

### 🔧 PHÁT TRIỂN TÍNH NĂNG MỚI

#### Tạo module mới (ví dụ: Product):

1. **Tạo files:**
```
src/api/product/
├── productModel.ts      # Zod schemas
├── productRepository.ts # Data access
├── productService.ts    # Business logic
├── productController.ts # HTTP handlers
├── productRouter.ts     # Routes
└── __tests__/          # Tests
```

2. **Đăng ký trong server.ts:**
```typescript
import { productRouter } from "@/api/product/productRouter";
app.use("/products", productRouter);
```

3. **Cập nhật OpenAPI docs:**
```typescript
// Trong openAPIDocumentGenerator.ts
import { productRegistry } from "@/api/product/productRouter";
const registry = new OpenAPIRegistry([..., productRegistry]);
```

### 🐳 DEPLOYMENT

#### Docker:
```bash
# Build và run
docker build -t myapp .
docker run -p 8080:8080 myapp
```

#### Cloud (Railway/Heroku):
```bash
# Đảm bảo có Dockerfile và env vars
NODE_ENV=production
PORT=8080
CORS_ORIGIN=https://yourdomain.com
```

### 🐛 TROUBLESHOOTING

| Lỗi | Giải pháp |
|-----|-----------|
| Port in use | `lsof -i :8080` và `kill -9 <PID>` |
| Dependencies | `rm -rf node_modules pnpm-lock.yaml && pnpm install` |
| TypeScript | Restart TS server, check import paths |
| Rate limiting | Tăng `COMMON_RATE_LIMIT_MAX_REQUESTS` |

### 📚 TÀI LIỆU THAM KHẢO

- **Swagger UI:** http://localhost:8080/swagger
- **Express docs:** https://expressjs.com
- **TypeScript:** https://typescriptlang.org
- **Zod validation:** https://zod.dev
- **Testing với Vitest:** https://vitest.dev

### 💡 TIPS

1. **Hot reload:** Sử dụng `pnpm start:dev` cho development
2. **Type safety:** Tận dụng Zod schemas cho validation + TypeScript types
3. **API docs:** Tự động generate từ Zod schemas
4. **Testing:** Viết tests cho mọi layer (Unit + Integration)
5. **Error handling:** Sử dụng ServiceResponse pattern
6. **Logging:** Sử dụng structured logging với Pino
7. **Security:** Helmet, CORS, rate limiting đã được setup sẵn 