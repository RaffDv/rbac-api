import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./global.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// app.useGlobalFilters(new AllExceptionsFilter());

	await app.listen(4000);
}
bootstrap();
