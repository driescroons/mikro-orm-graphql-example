import { FieldNode, GraphQLResolveInfo, SelectionNode } from 'graphql';

export const getRelationsFromInfo = (info: GraphQLResolveInfo, root = ''): string[] => {
  const paths = info.fieldNodes.reduce((list: string[][], node: FieldNode): string[][] => {
    const nested = (selection: SelectionNode, deep: number, parent: string[] = []) => {
      // check if we have nested fields
      if (!(selection as Pick<FieldNode, 'selectionSet'>).selectionSet) {
        return;
      }

      // if we're not on root level
      // and the field has a name
      if (deep > 0 && (selection as Pick<FieldNode, 'name'>)?.name?.value) {
        parent.push((selection as Pick<FieldNode, 'name'>)?.name?.value as string);
        // if it matches the root
        // and is longer than the root
        // push it to the list
        if (
          parent.slice(root === '' ? 0 : root.split('.').length).length > 0 &&
          parent.slice(0, root === '' ? 0 : root.split('.').length).toString() === root.split('.').toString()
        ) {
          list.push(parent.slice(root === '' ? 0 : root.split('.').length));
        }
      }

      // recursively loop over nested fields
      (selection as Pick<FieldNode, 'selectionSet'>).selectionSet.selections.forEach((selection: SelectionNode) =>
        nested(selection, deep + 1, [...parent]),
      );
    };
    nested(node, 0);
    return list;
  }, []);
  return paths.map((list: string[]) => list.join('.'));
};
