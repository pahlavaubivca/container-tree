export interface ISource {
    type: "directory" | "file"
    children?: Array<ISource>;

    [k: string]: any;
}

type TTemplate = (source: ISource) => HTMLDivElement;

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

    private _buildTree() {
        this._sources.forEach(source => {
            if (source.type === "directory") {
                const _dir = this._folderTemplate(source);
            } else {
                const _file = this._fileTemplate(source);
            }
        });
    }

    private _createDirectoryContainer() {
        const _directoryWrapper = document.createElement("div");
        _directoryWrapper.setAttribute("directory-wrapper", "");
        const _directoryViewContainer = document.createElement("div");
        _directoryViewContainer.setAttribute("directory-view", "");
        const _directoryItemsContainer = document.createElement("div");
        _directoryItemsContainer.setAttribute("directory-items", "");
        _directoryWrapper
            .appendChild(_directoryViewContainer)
            .appendChild(_directoryItemsContainer);
    }
}

(window as any).ContainerTree = ContainerTree;
