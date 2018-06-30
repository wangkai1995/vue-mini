
import * as nodeOp from '../dom-operation';
import { isEmpty } from '../../share/judge/util';

import { 
	setAttribute,
	setEventListener,
	processDirective,
	processModelDirective,
	processClassDirective,
	processShowDirective } from './process';


/**************************    删除部分         *****************************/

//这里还不完整
var removeElement = function(Vnode){
	if(Vnode.empty){
		var parent = nodeOp.getParent(Vnode.elm);
		nodeOp.removeChild(parent,Vnode.elm)
	}else{
		//这里还要卸载相应事件等等
		//还不完整
		var parent = nodeOp.getParent(Vnode.elm);
		nodeOp.removeChild(parent,Vnode.elm)
	}
}



/**************************    更新部分         *****************************/
//这里还不完整
var updateElement = function(oldNode,Vnode){
	//如果老节点存在,新节点不存在
	if(oldNode && !Vnode){
		removeElement(oldNode);
		return false;
	}
	//如果新节点存在,老节点不存在
	if(!oldNode && Vnode){
		var parentElm = Vnode.parent.elm;
		cerateElementBindAddParent(Vnode,parentElm)
		return false;
	}
	//如果节点类型出现不匹配
	if(Vnode.VnodeType !== oldNode.VnodeType ){
		//新老节点出现类型变化 则重新生产并且替换
		Vnode = cerateElement(Vnode);
		nodeOp.repalceNode(Vnode.parent.elm,Vnode.elm,oldNode.elm)
		return false;
	}

	//更新组件
	if(Vnode.VnodeType === 1){
		Vnode.elm = oldNode.elm;
		updateDirective(oldNode,Vnode);
		updateAttrs(oldNode,Vnode);
		updateChildren(oldNode.children, Vnode.children);
	}else if(Vnode.VnodeType === 2){
		Vnode.elm = oldNode.elm;
		updateText(oldNode,Vnode)
	}
}



//更新指令
var updateDirective = function(oldNode,Vnode){
	var oldDirective = oldNode.directives;
	var nowDirective = Vnode.directives;
	if(!nowDirective  || nowDirective.length ===0 ){
		return false;
	}
	//遍历新指令依次做对比更新
	for(var i=0; i<nowDirective.length ;i++){
		var now = nowDirective[i];
		var old = getOldDirectiveValue(now.name)
		//处理相应指令
		switch(now.name){
			case 'model':
					if(!old){
						processModelDirective(Vnode,now);
					}else if(old.value !== now.value){
						//更新值
						Vnode.attrs['value'] = now.value;
					}
				break;
			case 'class':
					//这里可能存在性能损耗
					processClassDirective(Vnode,now)
				break;
			case 'show':
					//这里可能存在性能损耗
					processShowDirective(Vnode,now)
				break;
		}
	}

	//获取旧指令集合中指令名对应的指令
	function getOldDirectiveValue(directiveName){
		if(!oldDirective || oldDirective.length === 0 ){
			return false;
		}
		for(var i=0; i<oldDirective.length ;i++){
			if(oldDirective[i].name === directiveName ){
				return oldDirective[i];
			}
		}
		return false
	}
}



//更新属性
var updateAttrs = function(oldNode,Vnode){
	var refElm = Vnode.elm;
	var oldAttrs = oldNode.attrs;
	var nowAttrs = Vnode.attrs;

	// console.log(nowAttrs,oldAttrs)

	if(!oldAttrs && !nowAttrs ){
		return false;
	}
	var nowKeys = (nowAttrs && !isEmpty(nowAttrs) )? Object.keys(nowAttrs): [];
	//遍历新属性集合更新对应节点属性
	for(var i=0; i<nowKeys.length ; i++){
		var key = nowKeys[i]
		//如果老节点没有
		if(!oldAttrs[key]){
			//checked 特殊处理
			if(key === 'checked'){
				//因为这里是转换成了字符串
				if(JSON.parse(nowAttrs[key])){
					nodeOp.setAttribute( refElm, key, 'checked')
				}
			}else{
				nodeOp.setAttribute( refElm, key, nowAttrs[key] )
			}
			continue;
		}
		//如果老节点有 那么比较
		if(oldAttrs[key] !== nowAttrs[key] ){
			delete oldAttrs[key];
			//checked 特殊处理
			if(key === 'checked'){
				//因为这里是转换成了字符串
				if(JSON.parse(nowAttrs[key])){
					nodeOp.setAttribute( refElm, key, 'checked')
				}else{
					nodeOp.removeAttribute( refElm, key)
				}
			//checked end
			}else{
				nodeOp.setAttribute( refElm, key, nowAttrs[key] )
			}
		}
	}
	//遍历旧属性集合 这里剩下的都是需要删除的
	var oldKeys = (oldAttrs && isEmpty(oldAttrs)) ? Object.keys(oldAttrs): [];
	for(var i=0; i<oldKeys.length ; i++){
		var key = oldKeys[i];
		delete oldAttrs[key];
		nodeOp.removeAttribute( refElm, key);
	}
}



//更新文本内容
var updateText = function(oldNode,Vnode){
	if(oldNode.text !== Vnode.text){
		nodeOp.setText(Vnode.elm,Vnode.text);
	}
}



//更新子节点
var updateChildren = function(oldChildren,children){
	//子节点递归更新
	var len = children.length;
	for(var i=0 ;i<len ;i++){
		var Vnode = children[i];
		var oldVnode;

		if(oldChildren && oldChildren[i]){
			oldVnode = oldChildren[i]
		}else{
			oldVnode = false;
		}
		updateElement(oldVnode,Vnode);
	}

	if(oldChildren){
		//删除余下的老节点
		for(var i=len; i<oldChildren.length ;i++){
			updateElement(oldChildren[i],false);
		}
	}
}


export {
	removeElement,
	//update
	updateElement,
	updateDirective,
	updateAttrs,
	updateText,
	updateChildren
}