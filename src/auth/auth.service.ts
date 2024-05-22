import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async validadeUser(
		username: string,
		password: string,
	): Promise<Partial<User> | null> {
		const user = await this.userService.findOne(username);

		if (user && user.password === password) {
			const { password, username, ...rest } = user;
			return rest;
		}
		return null;
	}
}
