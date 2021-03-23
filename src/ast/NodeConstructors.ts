import { ImportDeclaration } from './ImportDeclaration';
import { ImportSpecifier } from './ImportSpecifier';
import { ExpressionStatement } from './ExpressionStatement';
import { ExportDefaultDeclaration } from './ExportDefaultDeclaration';

import { Node } from './Node';

export const nodeConstructors: {
	[name: string]: typeof Node;
} = {
  /*DoWhileStatement,
	EmptyStatement,
	ExportAllDeclaration,
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
	ExportDefaultDeclaration,
	ExpressionStatement,
	ImportDeclaration,
	ImportSpecifier,
}
