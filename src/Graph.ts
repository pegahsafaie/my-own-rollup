import * as acorn from 'acorn';
import { ModuleLoader }  from './ModuleLoader';
import { Module } from './Module';
import injectClassFields from 'acorn-class-fields';
import injectStaticClassFeatures from 'acorn-static-class-features';
import { AcornNode } from './types';
export class Graph{
  acornParser: typeof acorn.Parser;
  modulesById: Map<string, Module>;
  moduleLoader: any;
  orderedModules: Module[] = [];
  constructor() {
    this.modulesById = new Map<string, Module>();
    this.moduleLoader = new ModuleLoader(this.modulesById, this);
    this.acornParser = acorn.Parser.extend(injectClassFields, injectStaticClassFeatures);
  }
  async build(): Promise<void> {
    await this.generateModuleGraph();
    this.sortModules(); 
  }
  async generateModuleGraph(): Promise<void> {
    await this.moduleLoader.loadEntryModule('./samples/default-export-import/main.js');
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

  sortModules() {
    const entryModule: Module = Array.from(this.modulesById, ([name, value]) => (value))
      .find(module => module.isEntry) as Module;
    const parents = new Map<Module, Module | null>().set(entryModule, null);

    const analyseModule = (module: Module) => {
      
      for (const dependency of module.dependencies) {
        if (parents.has(dependency)) {
          continue;
        }
        parents.set(dependency, module);
        analyseModule(dependency);
      }

      this.orderedModules.push(module);
    };

    
    analyseModule(entryModule);

  }
}
