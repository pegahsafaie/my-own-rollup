const acorn = require('acorn');

module.exports = class Graph {
  entryFiles: string[] = [];
  constructor(entryFile: string[]) {
    this.entryFiles = entryFile;
  }
  build() {
    const body = acorn.parse('const a = 1;').body;
    console.log(body);
  }
}