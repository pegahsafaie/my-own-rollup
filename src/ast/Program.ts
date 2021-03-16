import {Node} from './Node';
import * as NodeType from './NodeType';

export class Program extends Node {
	body!: object;
	sourceType!: 'module';
	type!: NodeType.tProgram;
}