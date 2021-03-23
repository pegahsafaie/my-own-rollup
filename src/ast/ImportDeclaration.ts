import { ImportSpecifier } from './ImportSpecifier';
import { Literal } from './Literal';
import { Node } from './Node';
import * as NodeType from './NodeType';

export class ImportDeclaration extends Node {
	source!: Literal<string>;
	specifiers!: (ImportSpecifier | Node)[];
	type!: NodeType.tImportDeclaration;

	initialise() {
		this.context.addImport(this);
	}

	render(magicString: string): string {
		return magicString.replace(/import .* from \S*.*;/, '');
	}
}
