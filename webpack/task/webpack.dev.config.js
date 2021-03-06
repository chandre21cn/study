var path = require('path');
//var webpack = require('webpack');
var config = {
	entry: ['./app/page1/index.js'],
	output: {
		filename: 'bundle.js',
		publicPath:"/assets/",
		path: path.resolve(__dirname, '..', 'dist')
	},
	module: {
		loaders: [
			{test: /\.js$/,loader: 'babel-loader',exclude: /node_modules/},
			{test:/\.css$/,loader:'style!css',exclude:/node_modules/}
		]
	}
}

module.exports = config;