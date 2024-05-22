import { Injectable } from "@nestjs/common";
import {
	AbilityBuilder,
	type AbilityClass,
	createMongoAbility,
	type ExtractSubjectType,
	type InferSubjects,
	type MongoAbility,
} from "@casl/ability";
import { User } from "src/user/entities/user.entity";

export enum Action {
	MANAGE = "manage", // wildcard for any action
	CREATE = "create",
	READ = "read",
	UPDATE = "update",
	DELETE = "delete",
}

export type Subject = InferSubjects<typeof User> | "all";
export type AppAbility = MongoAbility<[Action, Subject]>;

@Injectable()
export class AbilityFactory {
	defineAbility(user: User): AppAbility {
		const { can, cannot, build } = new AbilityBuilder<AppAbility>(
			createMongoAbility,
		);
		if (user.isAdmin) {
			can(Action.MANAGE, "all");
		} else {
			can(Action.READ, "all");

			cannot(Action.DELETE, User).because("You don't have that permission");

			cannot(Action.UPDATE, User).because("You don't have that permission");
			can(Action.UPDATE, User, { id: { $eq: user.id } });
		}

		return build({
			detectSubjectType: (item) =>
				item.constructor as ExtractSubjectType<Subject>,
		});
	}
}
