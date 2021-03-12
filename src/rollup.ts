const Graph = require('./Graph');

module.exports = function rollup() {
  const graph = new Graph(['index.js']);
  graph.build();
}
