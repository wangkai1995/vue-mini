
import { isNonPhrasingTag ,canBeleftOpenTag ,isUnaryTag } from '../../share/judge/element';
import { parseHTML } from './html-parse';
import { parseText } from './text-parse';



//设置attribute映射
function setAttributeMap(attrs){
	var attribute = {};
	for(var key in attrs){
		attribute[key] = attrs[key]
	}
	return attribute;
}



export  var parse = function(template ,options){
	var stack = [];
	var root;
	var currentParent ;	
	
	//开始解析
	parseHTML(template,{
		warnError : options.warnError,
		isNonPhrasingTag: isNonPhrasingTag,
		canBeleftOpenTag: canBeleftOpenTag,
		isUnaryTag: isUnaryTag,
		isIE: false,
		// 处理开始标签
		// 处理attribute部分还没做
		start: function(tag,attrs,unary){
			//组件
			var element = {
				type: 1,
				tagName:tag,
				attrs:attrs,
				attrMap: setAttributeMap(attrs),
				children: [],
			}
			//如果根节点不存在
			if(!root){
				root = element;
			}
			//父节点存在将自己加入父节点中
			if(currentParent){
				currentParent.children.push(element);
				element.parent = currentParent;
			}
			//不是自闭合组件
			if(!unary){
				//赋值自己当前父节点
				currentParent = element
				//加入堆栈
				stack.push(element);
			}
		},
		//处理结束标签
		end: function(tagName){
			var el = stack.pop();
			var lastNode = el.children[el.children.length -1 ];
			//移除最后一个空节点
			if(lastNode && lastNode.type === 3 && lastNode.text === ''){
				el.children.pop();
			}
			currentParent = stack[stack.length -1];
		},
		//处理文本
		chars: function(text){
			var expression;
			var text = text.trim();
			if( text !== ' ' && (expression = parseText(text)) ){
				currentParent.children.push({
					type:2,
					exp:expression,
					text: null
				})
			}else{
				currentParent.children.push({
					type:3,
					exp:null,
					text: text
				})
			}
		}
	});

	return root;
}









