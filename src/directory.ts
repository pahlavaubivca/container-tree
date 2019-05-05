import {File} from "./file";

export enum EState {
    open,
    close
}

export class Directory {
    public container: HTMLDivElement;
    public faceWrapper: HTMLDivElement;
    public itemsContainer: HTMLDivElement;
    public items: Array<File | Directory> = [];
    public parentDirectory: Directory;
    public nestingLevel: number;
    public state;
    private clickToOpenElement: HTMLElement;
    private _stateChangeHandler: (state: EState, dir: Directory) => void = (state) => {
    };
    private clickHandler = () => this.open();

    constructor() {
        this._createNode();
        this.setClickToOpenElement(this.faceWrapper);
        this.container
            .appendChild(this.faceWrapper);
        this.container
            .appendChild(this.itemsContainer);
    }

    public open(): Directory {
        this.state = EState.open;
        this.container.setAttribute("open", "");
        this.faceWrapper.style.display = "none";
        this.itemsContainer.style.display = "";
        this.itemsContainer.style.overflow = "scroll";
        if (this.parentDirectory)
            this.parentDirectory.items.forEach(item => {
                item.container.style.display = item != this ? "none" : "";
            });
        this._stateChangeHandler(EState.open, this);
        return this;
    }

    public close(): Directory {
        this.state = EState.close;
        this.faceWrapper.style.display = "";
        this.itemsContainer.style.display = "none";
        this.container.removeAttribute("open");
        if (this.parentDirectory)
            this.parentDirectory.items.forEach(item =>
                item.container.style.display = "");
        this._stateChangeHandler(EState.close, this);
        return this;
    }

    public setNestingLevel(level): Directory {
        this.nestingLevel = level;
        this.container.setAttribute("nesting-level", level);
        return this;
    }

    public setItem(item: File | Directory) {
        this.items.push(item);
        this.itemsContainer.appendChild(item.container);
        return this;
    }

    public setClickToOpenElement(element: HTMLElement): Directory {
        if (this.clickToOpenElement)
            this.clickToOpenElement.removeEventListener("click", this.clickHandler);
        this.clickToOpenElement = element;
        this.clickToOpenElement.addEventListener("click", this.clickHandler);
        return this;
    }

    public onStateChange(cb: (state: EState, dir) => void): Directory {
        this._stateChangeHandler = cb;
        return this;
    }

    private _createNode() {
        this.container = document.createElement("div");
        this.container.setAttribute("is-folder", "true");
        this.faceWrapper = document.createElement("div");
        this.faceWrapper.setAttribute("dir-face", "");
        this.itemsContainer = document.createElement("div");
        this.itemsContainer.setAttribute("items-container", "");
        this.itemsContainer.style.display = "none";
    }
}
