import {Directory} from "./directory";

export class File {
    public container: HTMLDivElement;
    public parentDirectory: Directory;
    public nestingLevel: number;

    constructor() {
        this.container = document.createElement("div");
        this.container.setAttribute("is-file", "true");
    }

    public setNestingLevel(level): File {
        this.nestingLevel = level;
        this.container.setAttribute("nesting-level", level);
        return this;
    }
}
