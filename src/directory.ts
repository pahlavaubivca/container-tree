export class Directory {
	public container: HTMLDivElement;
	public faceWrapper: HTMLDivElement;
	public items: HTMLDivElement;
	private clickToOpenElement: HTMLElement;

	constructor() {
		this.container = document.createElement("div");
		this.faceWrapper = document.createElement("div");
		this.items = document.createElement("div");
		this.container
			.appendChild(this.faceWrapper)
			.appendChild(this.items);
	}

	public open(): Directory {
		this.container.setAttribute("open", "");
		return this;
	}

	public close(): Directory {
		this.container.removeAttribute("open");
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
}
