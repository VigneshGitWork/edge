"use strict";

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TSConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

const deps = require("./package.json").dependencies;
// const ESLintPlugin = require('eslint-webpack-plugin');

const SOURCE_ROOT = __dirname + "/src/main/webpack";
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const resolve = {
	extensions: [".js", ".ts", ".jsx", ".tsx"],
	plugins: [
		new TSConfigPathsPlugin({
			configFile: "./tsconfig.json",
		}),
	],
};

module.exports = {
	resolve: resolve,
	entry: {
		site: SOURCE_ROOT + "/site/main.ts",
	},
	output: {
		filename: (chunkData) => {
			return chunkData.chunk.name === "dependencies"
				? "clientlib-dependencies/[name].js"
				: "clientlib-site/[name].js";
		},
		path: path.resolve(__dirname, "dist"),
		chunkFilename: (chunkData) => {
			return chunkData.chunk.name === "dependencies"
				? "clientlib-dependencies/[id].js"
				: "clientlib-site/[id].js";
		},
		// chunkFilename: "clientlib-site/[name].js",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader",
					},
					{
						loader: "glob-import-loader",
						options: {
							resolve: resolve,
						},
					},
				],
			},
			{
				test: /\.svg$/,
				loader: "svg-url-loader",
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
					},
					{
						loader: "glob-import-loader",
						options: {
							resolve: resolve,
						},
					},
				],
			},
			{
				// test: /\.scss$/,
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							url: process.env.NODE_ENV === "development", // false
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: {
									"postcss-prefix-selector": {
										prefix: ".skyplus-indigo-global-wrapper-v1",
										transform(
											prefix,
											selector,
											prefixedSelector,
											filePath,
											rule
										) {
											if (filePath.match(/react-datepicker/)) {
												return `${prefix} ${selector}`;
											}
											if (selector.match(/^(html)/)) {
												if (
													selector.includes(
														"html.skyplus-indigo-global-wrapper-v1"
													)
												) {
													return selector;
												}
												// return selector.replace(/^([^\s]*)/, `$1 ${prefix}`);
												return `${selector}${prefix}`;
											}
											if (selector === ":root") {
												// return selector.replace(/^([^\s]*)/, `$1 ${prefix}`);
												return selector;
											}
											if (filePath.match(/node_modules/)) {
												return selector; // Do not prefix styles imported from node_modules
											}
											if (filePath.includes("/dist/")) {
												return selector; // Do not prefix styles imported from dist
											}

											const annotation = rule.prev();
											if (
												annotation?.type === "comment" &&
												annotation.text.trim() === "no-prefix"
											) {
												return selector; // Do not prefix style rules that are preceded by: /* no-prefix */
											}

											return prefixedSelector;
										},
									},
									autoprefixer: {
										overrideBrowserslist: ["last 4 versions"],
									},
								},
							},
						},
					},
					{
						loader: "sass-loader",
					},
					{
						loader: "glob-import-loader",
						options: {
							resolve: resolve,
						},
					},
				],
			},
		],
	},
	plugins: [
		// new BundleAnalyzerPlugin(),
		new ModuleFederationPlugin({
			name: "container",
			filename: "remoteEntry.js",
			remotes: {
				login: `authentication@[mf_login]/remoteEntry.js`,
				booking: `booking@[mf_booking_widget]/remoteEntry.js`,
				passengerEdit: `passengerEdit@[mf_passenger_edit]/remoteEntry.js`,
				srp: `srp@[mf_srp]/remoteEntry.js`,
				addon: `addon@[mf_addon]/remoteEntry.js`,
				seatselect: `seatselect@[mf_seat_selection]/remoteEntry.js`,
				itinerary: `itinerary@[mf_itinerary]/remoteEntry.js`,
				reviewSummary: `reviewSummary@[mf_review_summary]/remoteEntry.js`,
				webCheckin: `webCheckin@[mf_web_checkin]/remoteEntry.js`,
				retrievePnr: `retrievePnr@[mf_retrieve_pnr]/remoteEntry.js`,
				hotelBookings: `hotelBookings@[mf_hotel_bookings]/remoteEntry.js`,
				internationalPassengerDetails: `internationalPassengerDetails@[mf_international_passenger_details]/remoteEntry.js`,
				planB: `planB@[mf_plan_b]/remoteEntry.js`,
			},

			shared: {
				// ...deps,
				react: {
					singleton: true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
			},
		}),
		new ExternalTemplateRemotesPlugin(),
		new CleanWebpackPlugin(),
		// new ESLintPlugin({
		//     extensions: ['js', 'ts', 'tsx']
		// }),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			"window.$": "jquery",
		}),
		new MiniCssExtractPlugin({
			// filename: "clientlib-[name]/[name].css",
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{
		// 			from: path.resolve(__dirname, SOURCE_ROOT + "/resources"),
		// 			to: "./",
		// 		},
		// 	],
		// }),
		new webpack.DefinePlugin({
			CONTAINER_ENV: process.env.NODE_ENV,
		}),
	],
	stats: {
		assetsSort: "chunks",
		builtAt: true,
		children: false,
		chunkGroups: true,
		chunkOrigins: true,
		colors: false,
		errors: true,
		errorDetails: true,
		env: true,
		modules: false,
		performance: true,
		providedExports: false,
		source: false,
		warnings: true,
	},
};
