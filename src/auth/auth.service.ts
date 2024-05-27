import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validadeUser(
		username: string,
		password: string,
	): Promise<Partial<User> | null> {
		const user = await this.userService.findOne(username);

		if (user && user.password === password) {
			const { password, username, ...rest } = user;
			return { ...rest, username };
		}
		return null;
	}

	async login(user: User): Promise<Record<string, string>> {
		console.log(user);

		const payload = { username: user.username, sub: user.id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
