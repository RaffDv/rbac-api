import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authservice: AuthService) {
		super(); // config here
	}

	async validate(username: string, password: string) {
		const user = await this.authservice.validadeUser(username, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
