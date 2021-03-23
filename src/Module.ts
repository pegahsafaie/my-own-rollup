import { Program } from './ast/Program';
import { ImportDeclaration } from "./ast/ImportDeclaration";
import { Node } from './ast/Node';
import { nodeConstructors } from './ast/NodeConstructors'; 

export class Module {
  magicString!: string;
	isEntry: boolean;
  ast: Program | null = null;
  originalCode!: string;
  astContext!: AstContext;
  sources = new Set<string>(); // list of static dependencies of the module
  dependencies: Module[] = [];
  constructor(
    public readonly id: string,
    isEntry: boolean) {
    this.isEntry = isEntry;
  }
  setSource({ code, ast }: any) {
    this.originalCode = code;
    this.magicString = code; // in this code it is always the same as originalCode. but imagine if we want to introduce source mapping to it and make it a bit more complicated containing some metadata
    this.astContext = {
			addImport: this.addImport.bind(this),
      nodeConstructors,
			module: this,
		};
    // it creates .sources which contains static dependencies to this module
    this.ast = new Program(ast, { type: 'module', context: this.astContext });
    console.log(this.ast);
  }
  addImport(node: ImportDeclaration) {
    const source = node.source.value;
		this.sources.add(source);
  }
  render(): string {
    this.magicString = this.ast!.render(this.magicString);
    return this.magicString;
  }
}

export interface AstContext {	
	addImport: (node: ImportDeclaration) => void;
	module: Module;
	nodeConstructors: { [name: string]: typeof Node };
}
