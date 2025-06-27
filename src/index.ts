import { app } from "@/server";
import { env } from "@/common/utils/envConfig";
import logger from "@/common/utils/logger";

const { HOST, PORT, NODE_ENV } = env;

logger.info('Khởi động server...');
logger.info(`Environment: ${NODE_ENV}`);
logger.info(`Host: ${HOST}`);
logger.info(`Port: ${PORT}`);

app.listen(PORT, HOST, () => {
	logger.info(`Server (${NODE_ENV}) running on http://${HOST}:${PORT}`);
	logger.info('API Documentation: http://${HOST}:${PORT}/docs');
	logger.info('Health Check: http://${HOST}:${PORT}/health-check');
});

const gracefulShutdown = (signal: string) => {
	logger.warn(`Nhận tín hiệu ${signal}, đang shutdown server...`);
	process.exit(0);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

process.on('uncaughtException', (error) => {
	logger.error('Uncaught Exception', error);
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	logger.error('Unhandled Promise Rejection', { reason, promise });
});
