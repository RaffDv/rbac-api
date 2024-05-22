import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./global.filter";
import { PrismaClientExceptionFilter } from "nestjs-prisma";
import { HttpStatus } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(
		new PrismaClientExceptionFilter(httpAdapter, {
			P2000: HttpStatus.BAD_REQUEST,
			P2002: HttpStatus.CONFLICT,
			P2025: HttpStatus.NOT_FOUND,
		}),
	);

	await app.listen(4000);
}
bootstrap();
