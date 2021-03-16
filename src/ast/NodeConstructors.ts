import { ImportDeclaration } from './ImportDeclaration';
import { ImportSpecifier } from './ImportSpecifier';
import { ExpressionStatement } from './ExpressionStatement';

import { Node } from './Node';

export const nodeConstructors: {
	[name: string]: typeof Node;
} = {
  /*DoWhileStatement,
	EmptyStatement,
	ExportAllDeclaration,
	ExportDefaultDeclaration,
	ExportNamedDeclaration,
	ExportSpecifier,
	ForInStatement,
	ForOfStatement,
	ForStatement,
	FunctionDeclaration,
	FunctionExpression,
	Identifier,
	IfStatement,
	ImportDefaultSpecifier,
	ImportNamespaceSpecifier,
	...*/
	ExpressionStatement,
	ImportDeclaration,
	ImportSpecifier,
}
