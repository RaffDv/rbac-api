import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AbilityFactory, Action } from "./ability.factory";
import { CHECK_ABILITY, RequiredRule } from "./abilities.decorator";
import { ForbiddenError } from "@casl/ability";
import currentUser from "src/user/curent-user";

@Injectable()
export class abilitiesGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private caslAbilityFactory: AbilityFactory,
	) {}

	canActivate(context: ExecutionContext): boolean {
		const rules =
			this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
			[];

		console.log(rules);

		// const {user}= context.switchToHttp().getRequest() // get user to auth

		const LoggedUser = currentUser;
		const ability = this.caslAbilityFactory.defineAbility(LoggedUser);

		try {
			rules.map((rule) =>
				ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
			);

			return true;
		} catch (error) {
			if (error instanceof ForbiddenError) {
				throw new ForbiddenException(error.message);
			}
		}
	}
}
