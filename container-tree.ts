import {Directory, EState} from "./src/directory";
import {File} from "./src/file";
import {Explorer} from "./src/explorer";

export interface ISource {
	type: "directory" | "file"
	children?: Array<ISource>;

	[k: string]: any;
}

type TTemplate = (source: ISource, directory?: Directory) => HTMLDivElement;
//todo
// add block and inline items view
// add directory or file to target dir
// add for Directory and File status hidden

/**
 * @desc Create tree structure from source object.
 * */
export class ContainerTree extends Explorer {
	public root: Directory;
	public currentDir: Directory;
	public nesting: Array<Directory>;
	private _sources: Array<ISource>;
	private _containers: Array<Directory | File>;
	private _fileTemplate: TTemplate;
	private _folderTemplate: TTemplate;

	constructor() {
		super();
		this._sources = [];
		this._containers = [];
		this.nesting = [];
		this.root = new Directory();
		this.root.open();
	}

	/**@desc Set source*/
	public setSource(sources: Array<ISource>) {
		this._sources.push(...sources);
		this._buildTree(sources, this.root);
		return this;
	}

	/** @desc Set folder template for define custom folder ui and clickToOpen element */
	public setFolderTemplate(template: TTemplate) {
		this._folderTemplate = template;
		return this;
	}

	public setInline(): ContainerTree {
		this._containers.forEach(cont => {
			cont.container.style.display = "inline-block";
		});
		return this;
	}

	/** @desc Define file custom element*/
	public setFileTemplate(template: TTemplate) {
		this._fileTemplate = template;
		return this;
	}

	/** @desc Build tree by source */
	private _buildTree(sources: Array<ISource>, parent: Directory, nesting = 1) {
		sources.forEach((source: ISource) => {
			let _item;
			if (source.type === "directory") {
				_item = new Directory();
				_item.onStateChange((state: EState, dir: Directory) => {
					//todo improve
					if (state === EState.open) {
						this.nesting.push(dir);
						this.currentDir = dir;
					} else if (state === EState.close) {
						this.nesting.splice(this.nesting.indexOf(dir), 1);
					}
				});
				if (this._folderTemplate) {
					const _face = this._folderTemplate(source, _item);
					_item.faceWrapper.appendChild(_face);
				}
				if (source.children)
					this._buildTree(source.children, _item, (nesting + 1));
			} else {
				_item = new File();
				if (this._fileTemplate) {
					const _file = this._fileTemplate(source);
					_item.container.appendChild(_file);
				}
			}
			_item.setNestingLevel(nesting);
			_item.parentDirectory = parent;
			parent.setItem(_item);
			this._containers.push(_item);
		});
	}
}

(window as any).ContainerTree = ContainerTree;
