import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
/*
this needs implementations with redis and user service to keep 
cookie and session smaller

serializer: done (null, {username:user.username})
*/
@Injectable()
export class SessionSerializer extends PassportSerializer {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	serializeUser(user: any, done: (err: Error, user: any) => void): any {
		done(null, user);
	}
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	deserializeUser(payload: any, done: (err: Error, payload: string) => void) {
		done(null, payload);
	}
}
