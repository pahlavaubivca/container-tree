export class File {
	public container: HTMLDivElement;

	constructor() {
		this.container = document.createElement("div");
		this.container.setAttribute("is-file", "true");
	}
}
