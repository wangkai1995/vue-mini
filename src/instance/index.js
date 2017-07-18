

import { initCompiler } from './render';



const VueMini = function(option){
	if(!option){
		warnError('Init error :option not undefined')
		return this;
	}
	this.self = this;
	this._option = option;
	//执行初始化
	this.init();
}



//初始化
VueMini.prototype.init = function(option){
	//初始化编译	
	initCompiler(this);
}




export default  VueMini;



