import {Directory} from "./directory";

export class Explorer {
	public currentDir: Directory;

	/** @desc Go back on 1 nesting level */
	public back() {
		if (this.currentDir) {
			this.currentDir.close();
			if (this.currentDir)
				this.currentDir.parentDirectory.open();
		}
	}
}
