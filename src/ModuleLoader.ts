const fs = require('fs');
const path = require("path");
import { Graph } from './Graph';
import { Module } from './Module';
import { AcornNode } from './types';


export class ModuleLoader {
  constructor(
    private readonly modulesById: Map<string, Module>,
    private readonly graph: Graph,
  ) {

  }
  /**
   * 
   * @param unresolvedId: relative address to resolve the module
   */
  async loadEntryModule(unresolvedId: string): Promise<void> {
    await this.fetchModule(unresolvedId, true);
  }

  /**
   * everything that should be done by fetching a module: 
   * adding that to the graph, start watching that and add the rest of dependencies
   */
  async fetchModule(id: string, isEntry: boolean): Promise<Module> {
    const module = new Module(id, isEntry);
		this.modulesById.set(id, module);
    this.addModuleSource(id, '', module);
		await this.fetchStaticDependencies(module);
    return module;
  }

  /**
   * Reads and trandforms the module content
   * the combination of importer and unresolvedId show the absolute address of the module
   * @param id 
   * @param importer 
   * @param module
   */
  addModuleSource(id: string, importer: string, module: Module) {
    const source:string = fs.readFileSync(id, 'utf-8');
    module.setSource(this.transform(source));    
  }

  /**
   * 
   * @param source transform the string source code to an AST object created by acorn parser
   * @returns 
   */
  transform(source: string): {code: string, ast: AcornNode} {
    return { 
      code: source,
      ast: this.graph.contextParse(source),
    }
  }

  /**
   * goes through the static dependencies of this module and fetch them as well.
   * static dependencies are the ones that we can resolve during build time
   * @param module 
   */
  fetchStaticDependencies(module: Module): Promise<void> {
    const dependencies = Array.from(module.sources, source => this.fetchResolvedDependency(source, module.id));
    return Promise.all(dependencies).then(resolvedDependencies => {
      module.dependencies = [...module.dependencies, ...resolvedDependencies];
    })
  }

  fetchResolvedDependency(id: string, importer: string): Promise<Module> {
    // External Modules: non-entry modules that start with neither '.' or '/' 
    // TODO:*
    // Internal Modules:
    const dirname = path.dirname(importer);
    const absolutePath = path.join(dirname, id);
    return this.fetchModule(absolutePath, false)

    // better to write a full node resolvers function that resolve relatively as well as absolutely from `node_modules/
  }
}