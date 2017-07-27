
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
		//下面几个属性还未处理
		// for if show 还未处理
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
	if(oldDirective.length ===0 && nowDirective.length ===0 ){
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
						//重新设置model绑定
						now.event = function(el){
							now.exp(el.target.value);
						}
						Vnode.attrs['value'] = now.value;
						Vnode.elm.addEventListener('input',now.event);
					}else if(old.value !== now.value){
						//更新值
						Vnode.attrs['value'] = now.value;
					}
				break;
			// for if show 还未处理
		}
	}

	//获取旧指令集合中指令名对应的指令
	function getOldDirectiveValue(directiveName){
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
	if(!oldAttrs && !nowAttrs ){
		return false;
	}
	var nowKeys = (nowAttrs && nowAttrs.length >0)? Object.keys(nowAttrs): [];
	//遍历新属性集合更新对应节点属性
	for(var i=0; i<nowKeys.length ; i++){
		var key = nowKeys[i]
		//如果老节点没有
		if(!oldAttrs[key]){
			nodeOp.setAttribute( refElm, key, nowAttrs[key] )
			continue;
		}
		//如果老节点有 那么比较
		if(oldAttrs[key] !== nowAttrs[key] ){
			delete oldAttrs[key];
			nodeOp.setAttribute( refElm, key, nowAttrs[key] )
		}
	}
	//遍历旧属性集合 这里剩下的都是需要删除的
	var oldKeys = (oldAttrs && oldAttrs.length >0) ? Object.keys(oldAttrs): [];
	for(var i=0; i<oldKeys.length ; i++){
		var key = oldKeys[i];
		delete oldAttrs[key];
		nodeOp.removeAttribute( refElm, key);
	}
}


//更新子节点
//这里存在问题 同一级节点 老节点删除一个  位置出现错误变化
//需要修改
var updateChildren = function(oldChildren,children){
	//子节点递归更新
	for(var i=0 ;i<children.length ;i++){
		var Vnode = children[i];
		var oldVnode;
		console.log(Vnode, oldChildren[i] ,111111111);

		if(oldChildren[i]){
			oldVnode = oldChildren[i]
			oldChildren.splice(i,1);
		}else{
			oldVnode = false;
		}
		
		updateElement(oldVnode,Vnode);
	}
	console.log(oldChildren,111)
	//删除余下的老节点
	for(var i=0; i<oldChildren.length ;i++){
		updateElement(oldChildren[i],false);
	}
}


//更新文本内容
var updateText = function(oldNode,Vnode){
	if(oldNode.text !== Vnode.text){
		nodeOp.setText(Vnode.elm,Vnode.text);
	}
}




/**********************   对外提供接口   ************************/

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
		// console.log('更新节点')
		console.log(oldNode,Vnode)
		updateElement(oldNode,Vnode)
		return false;
	}
	return Vnode;
}











