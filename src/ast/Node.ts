import * as NodeType from './NodeType';
import { AstContext } from '../Module';

export interface GenericEsTreeNode extends acorn.Node {
	[key: string]: any;
}


export class Node {
	context: AstContext;
	esTreeNode: GenericEsTreeNode;
	type!: keyof typeof NodeType;
  start!: number;
  end!: number ;
	keys: string[] = ['body'];

	constructor(
		esTreeNode: GenericEsTreeNode,
		parent: { context: AstContext; type: string },
		start: number = 0,
		end: number = 0
	) {
		this.esTreeNode = esTreeNode;
		this.context = parent.context;
		this.start = start;
		this.end = end;
		this.parseNode(esTreeNode);
		this.initialise();
	}

	/**
	 * Override to perform special initialisation steps after the scope is initialised
	 */
	 initialise() {}

	 /**
		* converts the tree of Acorn Nodes to a tree of rollup up Nodes
		* @param esTreeNode  
		*/
  parseNode(esTreeNode: GenericEsTreeNode) {
		for (const key of Object.keys(esTreeNode)) { // key = 'body'
			const value = esTreeNode[key]; // value = nodes inside body
			if (typeof value !== 'object' || value === null) {
				(this as GenericEsTreeNode)[key] = value;
			} else if (Array.isArray(value)) {
				(this as GenericEsTreeNode)[key] = []; //convert this node to GenericEsTreeNode which contains a set of free key values
				for (const child of value) {
					console.log('****', child.type);
					(this as GenericEsTreeNode)[key].push(child === null ? null : 
            new (this.context.nodeConstructors[child.type] || Node)(child, this, child.start, child.end))
				}
			} else {
				(this as GenericEsTreeNode)[key] = new (this.context.nodeConstructors[value.type] ||
					Node)(value, this, value.start, value.end);
			}
		}
	}


	/**
	 * transpiler
	 * @param magicString
	 */
	render(magicString: string): string {
		return magicString;
	}

}
