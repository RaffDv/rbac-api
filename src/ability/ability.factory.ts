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
	defineAbility(user: User) {
		const { can, cannot, build } = new AbilityBuilder<AppAbility>(
			createMongoAbility,
		);
		if (user.isAdmin) {
			// granted permissions
			can(Action.MANAGE, "all");

			// denied permissions
			cannot(Action.MANAGE, User, {
				orgId: { $ne: user.orgId },
			}).because("you can only manage users in own organization");
		} else {
			// granted permissions
			can(Action.READ, "all");
			can(Action.UPDATE, User, {
				id: user.id,
			});

			// denied permissions
			cannot(Action.DELETE, User).because("You don't have that permission");
			cannot(Action.UPDATE, User, {
				id: { $ne: user.id },
			}).because("You don't have that permission");
		}

		return build({
			detectSubjectType: (item) =>
				item.constructor as ExtractSubjectType<Subject>,
		});
	}
}
