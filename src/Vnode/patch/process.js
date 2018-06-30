
import * as nodeOp from '../dom-operation';
import { isEmpty } from '../../share/judge/util';

// style="xxxx=xxx(;)"判断正则
var styleSeparatorReg = /(;)+\s*$/;


//设置属性
var setAttribute = function(refElm,attrs){
	for(var key in attrs){
		//checked 特殊处理
		if(key === 'checked'){
			//因为这里是转换成了字符串
			if(JSON.parse(attrs[key])){
				nodeOp.setAttribute( refElm, key, 'checked')
			}
			continue;
		}
		nodeOp.setAttribute( refElm, key, attrs[key] )
	}
}

//绑定事件
var setEventListener = function(refElm,events){
	if(!Array.isArray(events) || events.length === 0){
		return false;
	}
	for(var i=0 ;i< events.length ; i++){
		(function(count){
			//这个标志用来解决闭包呢concat el问题
			var flag = true;
			events[count].instance = function(el){
				if(!events[count].params){
					events[count].params = [];
				}
				//组装参数
				if(flag){
					events[count].params = events[count].params.concat([el])
					flag = false;
				}
				//执行
				events[count].exp.apply(this,events[count].params)
			}
		})(i)
		refElm.addEventListener(events[i].name,events[i].instance);
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
			processModelDirective(Vnode,directive)
			continue;
		}
		//class特殊处理
		if(directive.name === 'class' && !isEmpty(directive.exp) ){
			processClassDirective(Vnode,directive)
			continue;
		}
		//show特殊处理
		if(directive.name === 'show'){
			processShowDirective(Vnode,directive)
			continue;
		}
	}
}


//处理model指令
var processModelDirective = function(Vnode,directive){
	directive.event = function(el){
		directive.exp(el.target.value);
	}
	Vnode.attrs['value'] = directive.value;
	Vnode.elm.addEventListener('input',directive.event);
}


//处理class指令
var processClassDirective = function(Vnode,directive){
	var attrs = Vnode.attrs
	var classList = '';

	//属性中是否存在class
	if( !isEmpty(attrs) ){
		classList = attrs['class'] != null? attrs['class'] : '';
	}
	//遍历class exp
	for(var className in directive.exp){
		if( directive.exp[className] ){
			classList += ' '+className;
		}
	}
	if(classList.length > 0){
		Vnode.attrs['class'] = classList;
	}
}


//处理show指令
var processShowDirective = function(Vnode,directive){
	var style = Vnode.attrs['style'];
	if(style && style.length >0){
		var display= directive.exp? 'display:show;':'display:none;';
			style += styleSeparatorReg.test(style)? display : ';'+display ;
	}else{
		style = directive.exp? 'display:show;':'display:none;'
	}
	Vnode.attrs['style'] = style;
}




export {
	setAttribute,
	setEventListener,
	processDirective,
	processModelDirective,
	processClassDirective,
	processShowDirective
}


