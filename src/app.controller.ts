import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { CheckAbilites } from "./ability/abilities.decorator";
import { User } from "./user/entities/user.entity";
import { Action } from "./ability/ability.factory";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@UseGuards(LocalAuthGuard)
	@Post("login")
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	login(@Req() req): any {
		return req.user;
	}

	@Get("protected")
	@CheckAbilites({
		action: Action.MANAGE,
		subject: User,
	})
	firstRoute() {
		return this.appService.getHello();
	}
}
