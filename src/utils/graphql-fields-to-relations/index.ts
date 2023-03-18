// this is https://github.com/bnussman/graphql-fields-to-relations
// ported to graphql 16
// it allows to limit the SQL to the specific fields requested in the GQL query
import { GraphQLResolveInfo } from 'graphql';
import { graphqlFields } from './fields';

export const fieldsToRelations = (
	info: GraphQLResolveInfo,
	options: { depth?: number; root?: string; excludeFields?: string[] } = {
		depth: undefined,
		root: '',
		excludeFields: []
	}
): string[] => {
	const paths: string[][] = [];

	const nested = (field: any, key: string = undefined as any, deep = 0, parent: string[] = []) => {
		if (Object.values(field).length === 0) {
			return;
		}

		if (deep > 0 || !!options.root) {
			parent.push(key);
			if (
				parent.slice(!options.root ? 0 : options.root?.split('.').length).length > 0 &&
				parent.slice(0, !options.root ? 0 : options.root?.split('.').length).toString() ===
					(!options.root ? '' : options.root?.split('.').toString())
			) {
				const path = parent.slice(!options.root ? 0 : options.root?.split('.').length);
				paths.push(path);
			}
		}

		Object.keys(field).forEach((key: any) => {
			if (Object.values(field[key]).length > 0 && !!options.depth ? deep < options.depth : true) {
				nested(field[key], key, deep + 1, [...parent]);
			}
		});
	};

	const value = !options.root
		? graphqlFields(info, {}, { excludedFields: options.excludeFields })
		: options.root.split('.').reduce(function (p, prop) {
				// eslint-disable-next-line
				return p[prop];
		  }, graphqlFields(info, {}, { excludedFields: options.excludeFields }));

	// eslint-disable-next-line no-extra-boolean-cast
	nested(value, !!options.root ? options.root.split('.').pop() : undefined);

	return paths.map((list: string[]) => list.join('.'));
};
