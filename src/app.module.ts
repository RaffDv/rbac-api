import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AbilityModule } from "./ability/ability.module";
import { APP_GUARD } from "@nestjs/core";
import { abilitiesGuard } from "./ability/abilites.guard";
import { PrismaModule } from "nestjs-prisma";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [
		UserModule,
		AbilityModule,
		PrismaModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		// S
	],
})
export class AppModule {}
