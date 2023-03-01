const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

const isProdNode = process.env.NODE_ENV === 'production';

const target = isProdNode ? 'browserslist' : 'web';
const devtool = isProdNode ? undefined : 'source-map';

module.exports = {
	target,
	devtool,
	entry: path.join(__dirname, 'src', 'entry.js'),
	output: {
		clean: true,
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/', 'template.html'),
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin(),
		new MiniCssExtractPlugin(),
	],
	devServer: {
		open: true,
		port: 3000,
		client: {
			overlay: true,
		},
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('postcss-preset-env')],
							},
						},
					},
				],
			},
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext]',
				},
			},
			{
				test: /\.svg$/,
				type: 'asset/resource',
				generator: {
					filename: 'icons/[name][ext]',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
		],
	},
	optimization: {
		minimizer: [new CssMinimizerPlugin()],
	},
};
