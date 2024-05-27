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
import { User } from "src/user/entities/user.entity";

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

		const request = context.switchToHttp().getRequest(); // get user to auth
		console.log("request user", request.user); // return undefined!!

		const LoggedUser = new User();
		(LoggedUser.username = "admin"),
			(LoggedUser.first_name = "admin"),
			(LoggedUser.id = 100),
			// biome-ignore lint/style/noCommaOperator: <explanation>
			(LoggedUser.isAdmin = false),
			(LoggedUser.password = "12345senha");
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
