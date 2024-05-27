import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from "@nestjs/common";

/*
this needs implementations with redis and user service to keep 
cookie and session smaller

*/
@Injectable()
export class AuthenticatedGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();

		try {
			return request.isAuthenticated();
		} catch (err) {
			throw new UnauthorizedException(
				"You need login to access this resource!!",
			);
		}
	}
}
