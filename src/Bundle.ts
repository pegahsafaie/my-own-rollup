import { Graph } from "./Graph";
import { OutputBundleWithPlaceholders } from "./types";
import { Chunk } from "./Chunk";
import MagicString, { Bundle as MagicStringBundle } from "magic-string";

export class Bundle {
  renderedSource: string = '';
  constructor(private readonly graph: Graph) {

  }

  generate() {
    // In our simplified code we just have one chunk. but it can be more
    // that's why outputBundle is a map of {id: chunk} in which id is the filename
    //outputBundle = {'main.js': {}, 'main2.js': {}}
    const outputBundle: OutputBundleWithPlaceholders = Object.create(null);
    const chunk = this.generateChunk();
    this.preRenderChunk(chunk);
    this.addFinalizedChunksToBundle(chunk, outputBundle);
    return outputBundle;
  }

  generateChunk() {
    const chunk = new Chunk(this.graph.orderedModules);
    return chunk;
  }

  /**
   * the modules in this chunk should be transpiled into final rollup format.
   * If the user needs to add any transpiler plugin can do it and it will apply at the latest step in finalise
   * 
   * in the original version both moduleSource and renderedSource are instances of magicString which is a useful 
   * npm library when working with string codes. but I use string for simplicity purposes
   * @param chunk 
   */
  preRenderChunk(chunk: Chunk) {
    const separator = '\n\n';
    const moduleSource: string[] = [];
    chunk.generateId();
    for (const module of chunk.orderedModules) {
      const magicString: string = module.render();
      moduleSource.push(magicString);
    }
    this.renderedSource = moduleSource.join(separator);
  }

  addFinalizedChunksToBundle(chunk: Chunk, outputBundle: OutputBundleWithPlaceholders) {
    // chunk render can apply cjs, umd or esm format to bundle. apart from that just call the mapstring.toString to get the code and also some meta data
    outputBundle[chunk.id!] = this.renderedSource;
  }
}