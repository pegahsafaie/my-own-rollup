import {Node} from './Node';
import * as NodeType from './NodeType';

export class Program extends Node {
	body!: Node[];
	sourceType!: 'module';
	type!: NodeType.tProgram;

	render(magicString: string): string {
		if (this.body.length) {
			for (const node of this.body) {
				// For simplicity purposes, we just wrote specific render functions for ExportDefaultDeclaration and ImportDeclaration. 
				// The other types of AST nodes will just return the code without modification(default render behaviour from node class)
				magicString = node.render(magicString);
			}
		} else {
			magicString = super.render(magicString);
		}
		return magicString;
	}
}
