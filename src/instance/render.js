
import { warnError } from '../share/utiliy/error';
import { isElement } from '../share/judge/util'
import { compileTemplateToFn } from '../compiler/index';



//查找元素 不存在则返回
function queryDom(el){
	if(typeof el === 'string'){
		var dom = document.querySelector(el);
		return dom;
	}else if(el.nodeType && el.nodeType === 1){
		return el;
	}
}



//获取标签全部内容
function getOuterHTML (el){
	if(el.outerHTML){
		return el.outerHTML;
	}else{
		var container = document.createElement('div');
		container.appendChild(el.cloneNode(true));
		return container.innerHtml
	}
}




//初始化编译
export var initCompiler = function(vue){
	var template;
	var option = vue._option
	var el = option.el;
	el = queryDom(el);
	if(!el || !isElement(el)){
		warnError('Compiler Error: el not is Dom NodeType or not query element')
		return false;
	}
	if(!vue._rootParent && el.nodeName !== 'BODY'){
		vue._rootParent = el.parentNode
	}else{
		vue._rootParent = el
	}
	template = option.template || getOuterHTML(el);
	//编译元素
	const render = compileTemplateToFn(template,{
		delimiters: option.delimiters,
		warnError: warnError
	},vue);	
	vue._render = render;
}












