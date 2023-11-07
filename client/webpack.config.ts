/* eslint-disable */

import Webpack, { DefinePlugin } from 'webpack';
import WebpackDev from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin'; // css-minimizer-webpack-plugin is used to compress the css files produced by mini-css-extract-plugin.
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import path from 'path';

const babelOptions = {
  presets: [ '@babel/preset-env' ],
  // plugins: [ '@babel/plugin-proposal-class-properties' ]
};

const mode = process.env.NODE_ENV ?? 'development';
const isProd = mode === 'production';
const port = Number(process.env.PORT) || 8080;

/**
 * This interface combines configuration from `webpack` and `webpack-dev-server`. You can add or override properties
 * in this interface to change the config object type used above.
 */
export interface Configuration extends Webpack.Configuration, WebpackDev.Configuration {}

const config: Configuration = {
	mode: isProd ? 'production' : 'development',
	entry: {
		index: ['./src/index.ts'],
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
	},
	output: {
		path: `${__dirname}/dist`,
		filename: `[name].[contenthash].js`,
		chunkFilename: `[name].[chunkhash].[contenthash].js`,
		clean: true,
		publicPath: '/'
		// environment: {
		// 	arrowFunction: false
		// },
		// iife: false
	},
	devServer: {
		hot: true,
		open: ['/online?id=123&accessToken=456'],
		historyApiFallback: true,	// To work with react routers, otherwise /page would try to fetch page.html
		devMiddleware: {
			stats: 'errors-only',
			writeToDisk: true,
		},
		static: {
			directory: path.join(__dirname, 'dist'),
			watch: true,
		},
		port: port,
	},
	module: {
		rules: [
			{
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      }, 
			{
				test: /\.(png|jpe?g|gif|mp4|ttf|webp)$/,
				type: 'asset/resource',
			},
			{
				test: /\.(svg)$/,
				type: 'asset/inline',
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					// {
					// 	loader: 'postcss-loader',
					// 	options: {
					// 		postcssOptions: {
					// 			plugins: [Autoprefixer],
					// 		},
					// 	},
					// },
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `[name].[contenthash].css`,
		}),
		new HtmlWebpackPlugin({
			title: 'Phaser TS Mono Template',
			template: './src/index.template.html',
			// inject: 'body',
		}),
		new DefinePlugin({
			'process.env.IS_STAGE': JSON.stringify(process.env.IS_STAGE),
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				'**/*', // The default - relative to the path specified in output property
				// path.join(process.cwd(), 'additional_dir_contents_to_be_removed/**/*')   // process.cwd() current working directory
			],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/game/src/assets'),
					to: path.resolve(__dirname, 'dist/game/src/assets'),
				},
			],
		}),
	],
	devtool: isProd ? false : 'source-map',
	// Edit the `browserslist` property in the package.json file to define which browsers Babel should target.
	// Browserslist documentation: https://github.com/browserslist/browserslist#browserslist-
	target: isProd ? 'web' : 'browserslist',
};

/** ****************************************************************************************************************** */
/** ********                                             Advanced                                            ********* */
/** ****************************************************************************************************************** */

// Configuration for production bundles
if (isProd) {
	// Clean the build directory for production builds
	// config.plugins?.push(new CleanWebpackPlugin());

	// Minify CSS files
	config.optimization?.minimizer?.push(
		new CSSMinimizerPlugin({
			parallel: true,
			minimizerOptions: {
				preset: [
					'default',
					{
						discardComments: { removeAll: true },
					},
				],
			},
		})
	);

	// Minify and treeshake JS
	if (config.optimization === undefined) {
		config.optimization = {};
	}

	config.optimization.minimize = true;
}

export default config;
