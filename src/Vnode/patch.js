
import * as nodeOp from './dom-operation';



/**************************    创建部分         *****************************/
//这里还不完整
var cerateElement = function(Vnode,parentElm){
	var tagName, children;
	var refElm;

	if(Vnode.VnodeType === 1 && !Vnode.empty){
		tagName = Vnode.tagName;
		children = Vnode.children;

		var refElm = nodeOp.createElement(tagName);
		Vnode.elm = refElm;
		//处理指令
		processDirective(Vnode, Vnode.directives);
		//设置属性
		setAttribute(Vnode.elm, Vnode.attrs);
		//设置事件
		setEventListener(Vnode.elm, Vnode.events);

		//更新生成子元素
		if(Array.isArray(children) && children.length > 0){
			for(var i = 0; i<children.length; i++){
				cerateElement(children[i],Vnode.elm);
			}	
		}
	}else if(Vnode.VnodeType === 2 && !Vnode.empty){
		refElm = nodeOp.createTextNode(Vnode.text);
		Vnode.elm = refElm;
	}

	nodeOp.appendChild(parentElm,refElm);
}


//设置属性
var setAttribute = function(refElm,attrs){
	for(var key in attrs){
		nodeOp.setAttribute( refElm, key, attrs[key] )
	}
}

//绑定事件
var setEventListener = function(refElm,events){
	if(!Array.isArray(events) || events.length === 0){
		return false;
	}
	for(var i=0 ;i< events.length ; i++){
		refElm.addEventListener(events[i].name,events[i].exp);
	}
}

//设置相应指令
//对应的删除还没做
var processDirective = function(Vnode,directives){
	if(!Array.isArray(directives) || directives.length === 0){
		return false;
	}
	for(var i=0 ;i<directives.length ;i++){
		var directive = directives[i];
		//model特殊处理
		if(directive.name === 'model' && !directive.event ){
			directive.event = function(el){
				directive.exp(el.target.value);
			}
			Vnode.attrs['value'] = directive.value;
			Vnode.elm.addEventListener('input',directive.event);
		}
	}
}



/**************************    删除部分         *****************************/
//这里还不完整
var removeElement = function(Vnode){
	if(Vnode.empty){
		var parent = nodeOp.getParent(Vnode.elm);
		nodeOp.removeChild(parent,Vnode.elm)
	}else{
		//这里要卸载相应事件
	}
}



/**************************    更新部分         *****************************/
//这里还不完整
var updateElement = function(oldNode,Vnode){
	console.log(oldNode,Vnode)
	//如果老节点存在,新节点不存在
	if(oldNode && !Vnode){
		removeElement(oldNode);
		return false;
	}
	//如果新节点存在,老节点不存在
	if(!oldNode && Vnode){
		var parentElm = Vnode.parent.elm;
		cerateElement(Vnode,parentElm)
		return false;
	}

}


//更新指令
var updateDirective = function(oldNode,Vnode){

}

//更新属性
var updateAttrs = function(oldNode,Vnode){

}


//更新子节点
var updateChildren = function(oldChildren,children){

}




//将虚拟节点更新到真实DOM中
export var patch = function(oldNode,Vnode,isRoot){
	//是否是根节点 并且老节点是空节点
	if(isRoot && oldNode.empty){
		//创建新元素 更新到DOM
		cerateElement(Vnode,Vnode.parent);
		//删除老节点 从DOM中删除对应真实节点
		removeElement(oldNode)
	}else if(oldNode && Vnode ){
		//不是的话 那么更新对比节点
		console.log('更新节点')
		updateElement(oldNode,Vnode)
	}
	return Vnode;
}











