import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AbilityModule } from "./ability/ability.module";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { AllExceptionsFilter } from "./global.filter";
import { abilitiesGuard } from "./ability/abilites.guard";

@Module({
	imports: [UserModule, AbilityModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: abilitiesGuard,
		},
	],
})
export class AppModule {}
