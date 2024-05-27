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
	Req,
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
import { JWTAuthGuard } from "src/auth/jwt-auth.guard";
import { abilitiesGuard } from "src/ability/abilites.guard";

@Controller("user")
@UseGuards(JWTAuthGuard)
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

	// @UseGuards(JWTAuthGuard)
	@UseGuards(abilitiesGuard)
	@Patch(":username")
	@CheckAbilites({
		action: Action.UPDATE,
		subject: User,
	})
	update(
		@Param("username") username: string,
		@Body() updateUserDto: UpdateUserDto,
		@Req() req,
	) {
		try {
			return this.userService.update(username, updateUserDto, req.user);
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
