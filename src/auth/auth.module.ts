import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: "SECRET-KEY-THIS-NEEDS-A-ENV-VARIABLE",
			signOptions: {
				expiresIn: "1d",
			},
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
