import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaClientExceptionFilter } from "nestjs-prisma";
import { HttpStatus } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const { httpAdapter } = app.get(HttpAdapterHost);
	// app.use(
	// 	// this needs a redis implementation to work in production
	// 	session({
	// 		secret: "keyboard",
	// 		resave: false,
	// 		saveUninitialized: false,
	// 		cookie: { maxAge: 3600000 },
	// 	}),
	// );

	// app.use(passport.initialize());
	// app.use(passport.session());

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
