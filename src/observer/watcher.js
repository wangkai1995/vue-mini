

import { warnError } from '../share/utiliy/error';
import { setDepTarget ,clearDepTarget } from './dep';
import {  createEmptyVnode } from '../Vnode/index';
import { patch } from '../Vnode/patch';
import { queryNode } from '../Vnode/dom-operation';


const Watcher = function(vue,render){
	this._vue = vue;
	this.depId = [];
	this._render = render;
	this.Vnode = null;
	//首次挂载
	this.render(true/*isRoot*/);
}

//添加绑定
Watcher.prototype.add = function(dep){
	//如果没有重复的dep则建立绑定
	if( this.depId.indexOf(dep.id) === -1){
		this.depId.push(dep.id);
		dep.add(this);
	}
}


//更新
Watcher.prototype.update = function(){
	var self = this;
	setTimeout(function(){
		self.render.call(self,false)
		//如果有更新回调事件,那么调用
		if(self._vue.updated){
			self._vue.updated();
		}
	},0);
}


Watcher.prototype.render = function(isRoot){
	var el = queryNode(this._vue._el);
	var Vnode;
	var oldVnode;
	if(!el){
		warnError('mount error: is new VueMini params el is no query dom');
		return false;
	}
	//生成
	try{
		setDepTarget(this);
		// var start  = new Date().getTime();
		Vnode = this._render.call(this._vue);
		clearDepTarget();
	}catch(e){
		warnError('mount error: is VueMini render error, detail message a '+e);
		clearDepTarget();
	}
	//挂载
	try{
		if(this.Vnode){
			oldVnode = this.Vnode;
		}else{
			oldVnode = createEmptyVnode();
			oldVnode.elm = el;
			//初次挂载事件
			if(this._vue.mounted){
				var self = this;
				setTimeout(function(){
					self._vue.mounted.call(self._vue)
				});
			}
		}
		//将虚拟节点 更新到真实dom上
		this.Vnode = patch( oldVnode, Vnode, isRoot /*isRoot*/ );
		// var end = new Date().getTime();
		// console.log( end-start )
	}catch(e){
		warnError('mount error: is VueMini mount error, detail message a '+e);
	}
}



export default Watcher;




