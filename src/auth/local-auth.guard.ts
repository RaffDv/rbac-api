import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/*
this needs implementations with redis and userService to keep 
cookie and session smaller

// async canActivate(context: ExecutionContext) {
	// const result = (await super.canActivate(context)) as boolean;
	// const request = context.switchToHttp().getRequest();
	// await super.logIn(request);
	// return result;
	// }


read this: https://dev.to/nestjs/setting-up-sessions-with-nestjs-passport-and-redis-210
*/

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}
