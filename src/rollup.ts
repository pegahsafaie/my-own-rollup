
import { Bundle } from './Bundle';
import { Graph }  from'./Graph';

const graph = new Graph();
graph.build().then(() => {
  const bundle = new Bundle(graph);
  const outputBundle = bundle.generate();
  console.log(outputBundle);
});

