import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AbilityModule } from "src/ability/ability.module";

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [AbilityModule],
	exports: [UserService],
})
export class UserModule {}
