// external libs
declare module 'acorn-static-class-features' {
	const plugin: (BaseParser: typeof acorn.Parser) => typeof acorn.Parser;
	export default plugin;
}

declare module 'acorn-class-fields' {
	const plugin: (BaseParser: typeof acorn.Parser) => typeof acorn.Parser;
	export default plugin;
}