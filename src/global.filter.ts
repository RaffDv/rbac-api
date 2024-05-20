import {
	type ExceptionFilter,
	Catch,
	type ArgumentsHost,
	HttpException,
	HttpStatus,
	ForbiddenException,
} from "@nestjs/common";
import type { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		// In certain situations `httpAdapter` might not be available in the
		// constructor method, thus we should resolve it here.
		const { httpAdapter } = this.httpAdapterHost;

		const ctx = host.switchToHttp();
		const httpStatus =
			exception instanceof HttpException ||
			exception instanceof ForbiddenException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const responseBody = {
			statusCode: httpStatus,
			timestamp: new Date().toISOString(),
			path: httpAdapter.getRequestUrl(ctx.getRequest()),
			message: exception,
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
