// export const roles = [
// 	{
// 		id: 1,
// 		name: "Admin",
// 	},
// 	{
// 		id: 2,
// 		name: "User",
// 	},
// ];

// export const permissions = [
// 	{
// 		id: 1,
// 		role_id: 1,
// 		action: "manage",
// 		subject: "all",
// 	},
// 	{
// 		id: 2,
// 		role_id: 2,
// 		action: "read",
// 		subject: "Story",
// 	},
// 	{
// 		id: 3,
// 		role_id: 2,
// 		action: "manage",
// 		subject: "Story",
// 		conditions: { created_by: "{{ id }}" },
// 	},
// ];

// export const users = [
// 	{
// 		id: 1,
// 		first_name: "Billian",
// 		last_name: "David",
// 		role_id: 1,
// 		email: "billy@yopmail.com",
// 	},
// 	{
// 		id: 2,
// 		first_name: "Bennison",
// 		last_name: "Devadoss",
// 		role_id: 2,
// 		email: "bennison@yopmail.com",
// 	},
// ];

// const prisma = new PrismaClient();

// async function main() {
// 	for await (const role of roles) {
// 		const roleAttrs = cloneDeep(role);
// 		delete roleAttrs.id;
// 		await prisma.role.upsert({
// 			where: {
// 				id: role.id,
// 			},
// 			create: roleAttrs,
// 			update: roleAttrs,
// 		});
// 	}

// 	for await (const permission of permissions) {
// 		const permissionAttrs = cloneDeep(permission);
// 		delete permissionAttrs.id;
// 		await prisma.permission.upsert({
// 			where: {
// 				id: permission.id,
// 			},
// 			create: permissionAttrs,
// 			update: permissionAttrs,
// 		});
// 	}

// 	for await (const user of users) {
// 		const userAttrs = cloneDeep(user);
// 		delete userAttrs.id;
// 		await prisma.user.upsert({
// 			where: {
// 				id: user.id,
// 			},
// 			create: userAttrs,
// 			update: userAttrs,
// 		});
// 	}
// }

// main()
// 	.then(async () => {
// 		await prisma.$disconnect();
// 	})
// 	.catch(async (error) => {
// 		console.log(error);
// 		await prisma.$disconnect();
// 	});
