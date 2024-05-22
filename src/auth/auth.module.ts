import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { UserModule } from "src/user/user.module";

@Module({
	imports: [UserModule, PassportModule],
	providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
