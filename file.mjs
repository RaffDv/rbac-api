import {
	createMongoAbility,
	AbilityBuilder,
	ForbiddenError,
} from "@casl/ability";

class Post {
	constructor(authorId) {
		this.authorId = authorId;
		this.content = "";
		this.isPublished = false;
	}
}

const userAbility = (user = {}) => {
	const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

	if (user.isAdmin) {
		can("manage", "all");
	} else {
		can("read", "Post");
		// 1 parameto -> ação
		// 2 parameto -> objeto/entidade
		// 3 parametro -> campos do objeto/entidade
		// 4 parametro -> condicoes
		can("update", "Post", ["content"], {
			authorId: user.id,
		}); // apenas atualizar o seu post, porem somente o CAMPO 'content', o campo isPublished não pode ser alterado por um usuario comum
		cannot("delete", "Post").because("Only Admins can delete posts!");
	}

	return build();
};

const user = {
	id: 5,
	isAdmin: false,
};

const somePost = new Post(5);

const ability = userAbility(user);
try {
	ForbiddenError.from(ability).throwUnlessCan("read", somePost);
} catch (error) {
	console.log(error.message);
}
