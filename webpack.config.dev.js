var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

/*
npm uninstall webpack --save-dev

npm install webpack@2.1.0-beta.22 --save-dev

*/

module.exports={
	devtool:'cheap-module-eval-source-map',
	//入口文件
	entry:{
		app:[
			'./src/index',
		],
	},
	//输出文件
	output:{
		//文件命名
		filename:'[name].js',
		//输出目录
		publicPath:'/static/',
	},
	//监控文件
	module:{
		loaders:[{
			//监听js
			test: /\.js$/,
			include:[
				path.resolve(__dirname,'src'),
			],
			loaders:['babel-loader'],
		}]
	},

	resolve:{
		extensions:['','.js'],
	},

};




