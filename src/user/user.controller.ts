import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpStatus,
	ForbiddenException,
	UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { AbilityFactory, Action } from "src/ability/ability.factory";

import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { ForbiddenError } from "@casl/ability";
import {
	CheckAbilites,
	ReadUserAbility,
} from "src/ability/abilities.decorator";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@CheckAbilites({
		action: Action.CREATE,
		subject: User,
	})
	create(@Body() createUserDto: CreateUserDto) {
		try {
			return this.userService.create(createUserDto);
		} catch (error) {
			if (error instanceof ForbiddenError) {
				throw new ForbiddenException(error.message);
			}
			throw new Error(error.message);
		}
	}

	@Get()
	@CheckAbilites(new ReadUserAbility())
	findAll() {
		return this.userService.findAll();
	}

	@Get(":username")
	@CheckAbilites(new ReadUserAbility())
	findOne(@Param("username") username: string) {
		return this.userService.findOne(username);
	}

	@Patch(":username")
	@CheckAbilites({
		action: Action.UPDATE,
		subject: User,
	})
	update(
		@Param("username") username: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		const LoggedUser = new User();
		(LoggedUser.username = "admin"),
			(LoggedUser.first_name = "admin"),
			// biome-ignore lint/style/noCommaOperator: <explanation>
			(LoggedUser.isAdmin = false),
			(LoggedUser.password = "12345senha");
		try {
			return this.userService.update(username, updateUserDto, LoggedUser);
		} catch (error) {
			if (error instanceof ForbiddenError) {
				throw new ForbiddenException(error.message);
			}
			throw new error(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete(":id")
	@CheckAbilites({
		action: Action.DELETE,
		subject: User,
	})
	remove(@Param("id") id: string) {
		return this.userService.remove(+id);
	}
}
