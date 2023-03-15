import { GraphQLResolveInfo } from 'graphql';
import { fieldsToRelations } from '../utils/graphql-fields-to-relations';

import { PopulateHint } from '@mikro-orm/core';

/*
 *  We wrap the fieldsToRelations package with our own function
 *  in order to use MikroORM v5 in a cleaner manner in our Resolver classes
 *
 *  For more details review
 *  https://mikro-orm.io/docs/loading-strategies#population-where-condition
 */
const resolveInfoToOrmFindOptions = (
	info: GraphQLResolveInfo,
	options?: {
		depth?: number;
		root?: string;
		excludeFields?: string[];
	},
	populationEnum?: PopulateHint
): unknown => {
	const relations: string[] = fieldsToRelations(info, options);

	return relations.length > 0
		? {
				populate: relations,
				populateWhere: populationEnum || PopulateHint.INFER
		  }
		: {};
};

export default resolveInfoToOrmFindOptions;
