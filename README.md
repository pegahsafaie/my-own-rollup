# Step 1: make initial project structure

# Step 2: create Bundle
  ### get the entry file
  ### create the ghraph of modules
  ### traverse(transform) with babel
  ### bundle them
  ### export it


# Step 3: convert code to esm and use your own rollup to bundle it!
# Step 4: make npm package installable/exposable



# Glossary
- unresolvedId: address of an unresolved module. the unresolved module is one which is not yet loaded and we dont know about the source
- dynamicImport: const importedModule = import(‘module_path’) the import callee is Import type, the expression is just CallExpression like other function calls.
- staticDependenciies: normal import like import x from ''
- externamModule: from node_modules (external modules (non-entry modules that start with neither '.' or '/'))
- implicitimport

