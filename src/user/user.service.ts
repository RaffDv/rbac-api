import { ForbiddenException, Injectable } from "@nestjs/common";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { AbilityFactory, Action } from "src/ability/ability.factory";
import { ForbiddenError } from "@casl/ability";

@Injectable()
export class UserService {
	constructor(private abilityFactory: AbilityFactory) {}
	create(createUserDto: CreateUserDto) {
		return "This action adds a new user";
	}

	findAll() {
		return "This action returns all user";
	}

	findOne(id: number) {
		const user = new User(); // pull from DB ( prisma )
		// biome-ignore lint/style/noCommaOperator: <explanation>
		(user.id = id), (user.orgId = 1), (user.isAdmin = false);
		return user;
	}

	update(id: number, updateUserDto: UpdateUserDto, currentUser: User) {
		const currentUserAbility = this.abilityFactory.defineAbility(currentUser);
		const userToUpdate = this.findOne(+id);

		ForbiddenError.from(currentUserAbility).throwUnlessCan(
			Action.UPDATE,
			userToUpdate,
		);

		// update call DB
		return `This action updates a #${id} user`; // correct response
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
