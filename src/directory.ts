import {File} from "./file";

export class Directory {
    public container: HTMLDivElement;
    public faceWrapper: HTMLDivElement;
    public itemsContainer: HTMLDivElement;
    public items: Array<File | Directory> = [];
    public parentDirectory: Directory;
    private clickToOpenElement: HTMLElement;

    constructor() {
        this._createNode();
        this.setClickToOpenElement(this.faceWrapper);
        this.container
            .appendChild(this.faceWrapper);
        this.container
            .appendChild(this.itemsContainer);
        this._setBaseStyle();
    }

    public open(): Directory {
        this.container.setAttribute("open", "");
        this.faceWrapper.style.display = "none";
        this.itemsContainer.style.display = "";
        this.parentDirectory.items.forEach(item => {
            item.container.style.display = item != this ? "none" : "";
        });
        return this;
    }

    public close(): Directory {
        this.faceWrapper.style.display = "";
        this.container.style.display = "none";
        this.container.removeAttribute("open");
        return this;
    }

    public setItem(item: File | Directory) {
        this.items.push(item);
        this.itemsContainer.appendChild(item.container);
        return this;
    }

    public setClickToOpenElement(element: HTMLElement): Directory {
        if (this.clickToOpenElement)
            this.clickToOpenElement.removeEventListener("click", this._openHandler);
        this.clickToOpenElement = element;
        this.clickToOpenElement.addEventListener("click", this._openHandler.bind(this));
        return this;
    }

    private _openHandler() {
        this.open();
    }

    private _setBaseStyle() {
        this.itemsContainer.style.width = "100%";
        this.itemsContainer.style.height = "100%";
        this.itemsContainer.style.display = "none";
    }

    private _createNode() {
        this.container = document.createElement("div");
        this.container.setAttribute("is-folder", "true");
        this.faceWrapper = document.createElement("div");
        this.faceWrapper.setAttribute("dir-face", "");
        this.itemsContainer = document.createElement("div");
        this.itemsContainer.setAttribute("items-container", "");
    }
}
