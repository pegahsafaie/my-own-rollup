import { Node } from "./Node";
import * as NodeType from './NodeType';

export class ExportDefaultDeclaration extends Node{
  declaration!: Node;
  type!: NodeType.tExportDefaultDeclaration;

  /**
   * 
   * @param code it is a transpiler which removes the 'export default' part from the code
   */
  render(magicString: string) {
    return magicString.replace('export default', '');
  }
}
