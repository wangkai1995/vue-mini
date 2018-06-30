

import * as nodeOp from '../dom-operation';
import { isEmpty } from '../../share/judge/util';

import { 
	setAttribute,
	setEventListener,
	processDirective,
	processModelDirective,
	processClassDirective,
	processShowDirective } from './process';

//创建组件
var cerateElement = function(Vnode){
	var tagName, children;

	if(Vnode.VnodeType === 1 && !Vnode.empty){
		tagName = Vnode.tagName;
		children = Vnode.children;

		Vnode.elm = nodeOp.createElement(tagName);
		//处理指令
		processDirective(Vnode, Vnode.directives);
		//设置属性
		setAttribute(Vnode.elm, Vnode.attrs);
		//设置事件
		setEventListener(Vnode.elm, Vnode.events);

		//递归更新生成子元素
		if(Array.isArray(children) && children.length > 0){
			for(var i = 0; i<children.length; i++){
				cerateElementBindAddParent(children[i],Vnode.elm);
			}	
		}
	}else if(Vnode.VnodeType === 2 && !Vnode.empty){
		Vnode.elm = nodeOp.createTextNode(Vnode.text);
	}
	return Vnode;
}

//创建组件并且添加到父节点中
var cerateElementBindAddParent = function(Vnode,parentElm){
	var Vnode = cerateElement(Vnode);
	nodeOp.appendChild(parentElm,Vnode.elm);
}



export {
	cerateElement,
	cerateElementBindAddParent,
}