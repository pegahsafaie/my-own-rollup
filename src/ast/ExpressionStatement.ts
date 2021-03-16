import { Node } from './Node';

export class ExpressionStatement extends Node {
	directive?: string;
	expression!: Node;
}
