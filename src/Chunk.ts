import { Module } from "./Module";


export class Chunk {
  entryModule: Module | null = null;
  id: string | null = null;
  orderedModules: Module[] = [];
  constructor(orderedModules: Module[]) {
    this.orderedModules = orderedModules;
    for (const module of orderedModules) {
      if (module.isEntry) {
				this.entryModule = module;
			}
    }
  }

  generateId() {
    // Normally this function is responsible to produce the ids of all the chunks but we have just one and name it after
    // our entry module
    this.id = this.entryModule!.id;
  }
}