interface AcornNode {
	end: number;
	start: number;
	type: string;
}

export interface OutputBundleWithPlaceholders {
	[fileName: string]: OutputAsset | OutputChunk | FilePlaceholder;
}