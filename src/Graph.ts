import * as acorn from 'acorn';
import { ModuleLoader }  from './ModuleLoader';
import { Module } from './Module';
import injectClassFields from 'acorn-class-fields';
import injectStaticClassFeatures from 'acorn-static-class-features';
export class Graph{
  acornParser: typeof acorn.Parser;
  modulesById: Map<string, Module>;
  moduleLoader: any;
  constructor() {
    this.modulesById = new Map<string, Module>();
    this.moduleLoader = new ModuleLoader(this.modulesById, this); // why cant I use moduleloader type here?  
    this.acornParser = acorn.Parser.extend(injectClassFields, injectStaticClassFeatures);
  }
  build() {
    this.generateModuleGraph();  
  }
  generateModuleGraph() {
    this.moduleLoader.loadEntryModule('./samples/default-export-import/main.js');
    console.log(this.modulesById);
    // modulesById is filled by loading entry module
    // foreach on all modules in modulesById
  }

  contextParse(code: string): AcornNode {
    return this.acornParser.parse(code, {
      allowAwaitOutsideFunction:true,
      ecmaVersion:'latest',
      preserveParens:false,
      sourceType:'module'
    })
  }
}
