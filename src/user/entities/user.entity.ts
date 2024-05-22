import { User as UserP } from "@prisma/client";
export class User implements UserP {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	password: string;
	isAdmin: boolean;
}
