# why I chose rollup?
- Because I like rollup as a fast light module bundler.
It is much more convevnient to configure a rollup rather than a webpack. I also like the 3 types of output it creates for libraries: 'UMD', 'CJS' and 'ESM'(webpackk for example just creates ESM).
- I also wanted to simplify the rollup repo so the beginner contributers like me can start with that.
I found few articles to simplify webpack repo but nothing for rollup. Both webpack and rollups have pretty same behaviour in creating the dependency graph. but the final bundle is different.(the one from rollup is lighter)
- I am intrested in Vite and Vite uses rollup on behind. So it also can be a good entry point to Vite.
- ecosystem and contribution to webpack is already too big. 
- because React, Vue, Ember, Preact, D3, Three.js, Moment, and dozens of other well-known libraries use Rollup. So I wanted to know what’s going on?

# Project structure
There are two main stages of a bundler
1. ## Dependency resolution
Starting from an entry point (such as app.js above), the goal of dependency resolution is to look for all of the dependencies of your code (other pieces of code that it needs to function) and construct a graph (called a dependency graph).
The dependency graph is a directed graph, where the vertex is the module, and the directed edge is the dependency relationship between the modules.

2. ## Packing
And that's what makes the difference with webpack!
Once this is done, you can then pack or convert your dependency graph into a single file that the application can use.

3. ## Advanced Features
### HTML Server
### Hot Loading
### Tree Shaking
### Plugins

# Glossary
- id: module file address 
- resolve dependencies: In Node there is a thing called the require.resolve, and it’s how Node figures out where the file that you are requiring is. This is because we can import relatively or from a node_modules folder.
- dynamicImport: const importedModule = import(‘module_path’) the import callee is Import type, the expression is just CallExpression like other function calls.
- staticDependenciies: module start with either '.' or '/'
- externalModule: non-entry modules that start with neither '.' or '/' (from node_modules)
- implicitimport: ?
- AST Nodes you must know
  **ImportDefaultSpecifier**: import a declared a as alias of module default export
  **ImportNamespaceSpecifier**: import * as a declared a as alias of all things a module exported
  **ImportSpecifier**: import { a as b } declared "b" as alias of a module's named export "a", same as the one without alias
  All of them own a local.name property to store the alias name, and for ImportSpecifier, you may get the original name from imported.name.
  Module path is stored in node’s source.value property. But the file represented by this path could be uncertain

# Implementation


1. Bundler implementation

,I have created one commit per feature so it is easy for you to trace the changes. You can see a photo here,
Limitations: just able to distinqwish default import and export from other statements and that's why just support default import for creating dependency graph and default export for creating bundle

2. Convert code to esm and use your own rollup to bundle it!
3. Make npm package installable/exposable(+ typing)
4. add babel transpiler as a plugin


# How to play with it
Currently it just support default internal imports. If you want to add more functionality into it,
- add your code
- replace your test sample in samples folders
- npm start
It should show you the graph module created and also ...


# useful links
https://www.freecodecamp.org/news/lets-learn-how-module-bundlers-work-and-then-write-one-ourselves-b2e3fe6c88ae/
https://lihautan.com/i-wrote-my-module-bundler/
https://lihautan.com/what-is-module-bundler-and-how-does-it-work
https://www.danielberndt.net/2018/you-might-not-need-rollup-for-libraries/
https://dev.to/proticm/how-to-setup-rollup-config-45mk
https://medium.com/@adostes/authoring-a-javascript-library-that-works-everywhere-using-rollup-f1b4b527b2a9
https://rollupjs.org/repl
https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c