
import * as nodeOp from './dom-operation';


//这里还不完整
var cerateElement = function(Vnode,parentElm){
	var tagName, children, attrs ,refElm;
	if(Vnode.VnodeType === 1 && !Vnode.empty){
		tagName = Vnode.tagName;
		children = Vnode.children;
		attrs = Vnode.attrs;

		var refElm = nodeOp.createElement(tagName);
		Vnode.elm = refElm;
		setAttribute(Vnode.elm,attrs);

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



var setAttribute = function(refElm,attrs){
	for(var key in attrs){
		nodeOp.setAttribute( refElm, key, attrs[key] )
	}
}




//这里还不完整
var removeElement = function(Vnode){
	if(Vnode.empty){
		var parent = nodeOp.getParent(Vnode.elm);
		nodeOp.removeChild(parent,Vnode.elm)
	}
}




//将虚拟节点更新到真实DOM中
export var patch = function(oldNode,Vnode,isRoot){
	//是否是根节点 并且老节点是空节点
	if(isRoot && oldNode.empty){
		//创建新元素 更新到DOM
		cerateElement(Vnode,Vnode.parent);
		//删除老节点 从DOM中删除对应真实节点
		removeElement(oldNode)
	}
	return Vnode;
}











