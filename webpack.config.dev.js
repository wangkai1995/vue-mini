var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var IsProduction = process.env.NODE_ENV === 'build'; //发布环境;

/*
npm uninstall webpack --save-dev

npm install webpack@2.1.0-beta.22 --save-dev

"babel-core": "^6.22.1",
"babel-loader": "^6.2.10",
"babel-preset-es2015": "^6.22.0",
"babel-preset-react": "^6.22.0",

*/

var configPlugins = [];
var devtool ='cheap-module-eval-source-map';

if (IsProduction) {
	configPlugins.push(new webpack.optimize.UglifyJsPlugin({
		output: {
	        comments: false,  // remove all comments
	    },
		compress: {
			warnings: true
		}
	}));
	devtool = 'cheap-module-source-map'
}


module.exports={
	devtool: devtool,
	//入口文件
	entry:{
		vueMini:[
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
	plugins:configPlugins

};




