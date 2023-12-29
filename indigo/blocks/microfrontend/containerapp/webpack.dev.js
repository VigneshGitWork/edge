const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HandlebarsWebpackPlugin = require("handlebars-webpack-plugin");

const SOURCE_ROOT = __dirname + "/src/main/webpack";

module.exports = (env) => {
	const writeToDisk = env && Boolean(env.writeToDisk);

	return merge(common, {
		mode: "development",
		// performance: {
		//     hints: 'warning',
		//     maxAssetSize: 1048576,
		//     maxEntrypointSize: 1048576
		// },
		devtool: "source-map",
		module: {
		
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, SOURCE_ROOT + "/static/home.html"),
				filename: "index.html", // changed filename to index.html so that it automatically open in browser on npm start
			}),

			new HandlebarsWebpackPlugin({
				entry: path.join(
					process.cwd(),
					"src",
					"main",
					"webpack",
					"pages",
					"*",
					"*.hbs"
				),
				// output: path.join(process.cwd(), "src", "main", "webpack", "static", "[name].html"),
				output: path.join(
					process.cwd(),
					"src",
					"main",
					"webpack",
					"static",
					"[name].html"
				),
				partials: [
					// path.join(process.cwd(), "html", "*", "*.hbs"),
					path.join(process.cwd(), "src", "main", "webpack", "**/*", "*.hbs"),
				],
			}),
		],
		devServer: {
			// proxy: [{
			//     context: ['/content', '/etc.clientlibs'],
			//     target: 'http://localhost:4502',
			// }],
			client: {
				overlay: {
					errors: true,
					warnings: false,
				},
			},
			watchFiles: ["src/**/*"],
			hot: false,
			devMiddleware: {
				writeToDisk: true,
			},
		},
	});
};
