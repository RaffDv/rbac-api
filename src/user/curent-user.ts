import { User } from "./entities/user.entity";

const currentUser = new User();

// biome-ignore lint/style/noCommaOperator: <explanation>
(currentUser.id = 1), (currentUser.isAdmin = false), (currentUser.orgId = 2);
export default currentUser;
