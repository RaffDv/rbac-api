import { ForbiddenException, Injectable } from "@nestjs/common";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { AbilityFactory, Action } from "src/ability/ability.factory";
import { ForbiddenError } from "@casl/ability";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class UserService {
	constructor(
		private abilityFactory: AbilityFactory,
		private prisma: PrismaService,
	) {}
	async create(createUserDto: CreateUserDto) {
		try {
			await this.prisma.user.create({
				data: {
					...createUserDto,
					isAdmin: false,
				},
			});
			return;
		} catch (error) {
			return;
		}
	}

	async findAll() {
		const users: User[] = await this.prisma.user.findMany();
		return users;
	}

	async findOne(username: string) {
		const user: User = await this.prisma.user.findUniqueOrThrow({
			where: {
				username,
			},
		});
		return user;
	}

	async update(
		username: string,
		updateUserDto: UpdateUserDto,
		currentUser: User,
	) {
		const currentUserAbility = this.abilityFactory.defineAbility(currentUser);
		const userToUpdate = await this.findOne(username);

		ForbiddenError.from(currentUserAbility).throwUnlessCan(
			Action.UPDATE,
			userToUpdate,
		);

		const updatedUser = await this.prisma.user.update({
			data: updateUserDto,
			where: {
				username,
			},
		});
		return {
			updatedUser,
		};
	}

	async remove(id: number) {
		await this.prisma.user.delete({
			where: { id },
		});
		return;
	}
}
