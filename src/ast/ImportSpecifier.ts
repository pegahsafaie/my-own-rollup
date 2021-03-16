import * as NodeType from './NodeType';
import { Node } from './Node';

export class ImportSpecifier extends Node {
	imported!: Node;
	local!: Node;
	type!: NodeType.tImportSpecifier;
}
