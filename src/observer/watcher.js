

import { warnError } from '../share/utiliy/error';
import { setDepTarget ,clearDepTarget } from './dep';
import {  createEmptyVnode } from '../vnode/index';
import { patch } from '../vnode/patch';
import { queryNode } from '../vnode/dom-operation';


const Watcher = function(vue,render){
	this._vue = vue;
	this.depId = [];
	this.render = render;
	this.Vnode = null;
	//首次挂载
	this.update();
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
	var el = queryNode(this._vue._el);
	if(!el){
		warnError('mount error: is new VueMini params el is no query dom');
		return false;
	}

	setDepTarget(this);
	try{
		var Vnode = this.render.call(this._vue);
		this.Vnode = Vnode
		var oldVnode = createEmptyVnode()
		oldVnode.elm = el;
		clearDepTarget();
		//将虚拟节点 更新到真实dom上
		patch( oldVnode, Vnode, true /*isRoot*/ );
	}catch(e){
		warnError('mount error: is VueMini render error, detail message a '+e);
		clearDepTarget();
	}
}




export default Watcher;




