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
import currentUser from "./curent-user";
import { abilitiesGuard } from "src/ability/abilites.guard";

@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private abilityFactory: AbilityFactory,
	) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		const ability = this.abilityFactory.defineAbility(currentUser);

		try {
			ForbiddenError.from(ability).throwUnlessCan(Action.CREATE, User);

			return this.userService.create(createUserDto);
		} catch (error) {
			if (error instanceof ForbiddenError) {
				throw new ForbiddenException(error.message);
			}
			throw new Error(error.message);
		}
	}

	@Get()
	@UseGuards(abilitiesGuard)
	findAll() {
		return this.userService.findAll();
	}

	@Get(":id")
	@UseGuards(abilitiesGuard)
	findOne(@Param("id") id: string) {
		return this.userService.findOne(+id);
	}

	@Patch(":id")
	@CheckAbilites({
		action: Action.UPDATE,
		subject: User,
	})
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		try {
			return this.userService.update(+id, updateUserDto, currentUser);
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
