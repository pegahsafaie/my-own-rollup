import * as NodeType from './NodeType';

export class Literal<T extends any> {
  type!: NodeType.tLiteral;
	value!: T;
}
