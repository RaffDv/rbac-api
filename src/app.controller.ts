import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthenticatedGuard } from "./auth/authenticated.guard";
import { AuthService } from "./auth/auth.service";
import { JWTAuthGuard } from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post("login")
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	login(@Req() req): any {
		return this.authService.login(req.user);
	}

	@UseGuards(JWTAuthGuard)
	@Get("/protected")
	getHello(@Req() req): string {
		// TODO: require an Bearer Token, validate token
		return req.user;
	}
}
