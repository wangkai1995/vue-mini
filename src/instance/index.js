

import { toStringify } from '../share/utiliy/index';
import { initCompiler } from './render';
import { initData } from './data';

import {
	createVNodeElement,
	createVNodeText,
} from '../VNode/index';


var uid = 0;

const VueMini = function(option){
	if(!option){
		warnError('Init error :option not undefined')
		return this;
	}
	this.id = uid++;
	this.self = this;
	this._option = option;
	//执行初始化
	this.$init();
}


/**************  原型方法   ***************/
//初始化
VueMini.prototype.$init = function(){
	//初始化编译	
	initCompiler(this);
	//初始化data数据建立绑定
	initData(this);

}


//挂载
VueMini.prototype.$mount = function(){

	

}


/**********   render中使用  ***********/
VueMini.prototype._s = toStringify;
VueMini.prototype._c = createVNodeElement;
VueMini.prototype._v = createVNodeText;




export default  VueMini;



