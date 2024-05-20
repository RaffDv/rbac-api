import { SetMetadata } from "@nestjs/common";
import { Action, Subject } from "./ability.factory";
import { User } from "src/user/entities/user.entity";

export const CHECK_ABILITY = "check_ability";

export interface RequiredRule {
	action: Action;
	subject: Subject;
}
export class ReadUserAbility implements RequiredRule {
	action = Action.READ;
	subject = User;
}

export const CheckAbilites = (...requirements: RequiredRule[]) =>
	SetMetadata(CHECK_ABILITY, requirements);
