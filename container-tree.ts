import {Directory} from "./src/directory";
import {File} from "./src/file";

export interface ISource {
	type: "directory" | "file"
	children?: Array<ISource>;

	[k: string]: any;
}

type TTemplate = (source: ISource, directory?: Directory) => HTMLDivElement;

export class ContainerTree {
	public root: HTMLDivElement;
	private _sources: Array<ISource> = [];
	private _fileTemplate: TTemplate;
	private _folderTemplate: TTemplate;

	constructor() {
		this.root = document.createElement("div");
	}

	public setSource(sources: Array<ISource>) {
		this._sources = this._sources.concat(sources);
		this._buildTree(this._sources, this.root);
		return this;
	}

	public setFolderTemplate(template: TTemplate) {
		this._folderTemplate = template;
		return this;
	}

	public setFileTemplate(template: TTemplate) {
		this._fileTemplate = template;
		return this;
	}

	// open struct to tree
	public openToBottom() {
	}

	//hide parent struct, view only current
	public openOnFull() {
	}

	private _buildTree(sources: Array<ISource>, parent) {
		sources.forEach(source => {
			let _item;
			if (source.type === "directory") {
				const _item = new Directory();
				const _face = this._folderTemplate(source, _item);
				_item.faceWrapper.appendChild(_face);
				if (source.children)
					this._buildTree(source.children, _item.items);
			} else {
				_item = new File();
				const _file = this._fileTemplate(source);
				_item.container.appendChild(_file);
			}
			parent.appendChild(_item);
		});
	}
}

(window as any).ContainerTree = ContainerTree;
