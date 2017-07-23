

//查询节点
export var queryNode = function(el){
	var elm = document.querySelector(el);
	return elm;
}


//创建元素节点
export var createElement = function(el){
	return document.createElement(el);
}

//创建文本节点
export var createTextNode = function(text){
	return document.createTextNode(text);
}

//设置节点文本内容
export var setText = function(el,text){
	return el.textContent = text;
}


//设置节点属性
export var setAttribute = function(el,attrKey,attrValue){
	el.setAttribute(attrKey,attrValue)
}


//复制节点
export var cloneElement = function(el,flag){
	return el.cloneElement(flag?true:false);
}


//删除属性
export var removeAttribute = function(el,attrKey){
	el.removeAttribute(attrKey);
}


//删除子节点
export var removeChild = function(el,child){
	el.removeChild(child);
}


//获取父节点
export var getParent = function(el){
	return el.parentNode? el.parentNode : false;
}


//加入子节点
export var appendChild = function(el,child){
	el.appendChild(child);
}



//插入新节点
export var insertBefoce = function(el,newChild,child){
	el.insertBefoce(newChild,child);
}





