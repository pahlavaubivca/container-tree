const path = require("path");
module.exports = {
	devtool: "source-map",
	context: path.resolve(__dirname),
	entry: {
		main: path.resolve(__dirname, "container-tree.ts")
	},
	mode: "development",

	output: {
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			use: [{
				loader: "ts-loader",
			}],
		}],
	},
	resolve: {
		extensions: [".ts", ".js", ".json"],
		modules: [
			"node_modules",
		],
		mainFields: ['browser', 'module', 'main']
	},
	node: {
		fs: 'empty',
		child_process: "empty"
	}
};
