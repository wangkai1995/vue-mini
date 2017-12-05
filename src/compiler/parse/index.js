
import { isNonPhrasingTag ,canBeleftOpenTag ,isUnaryTag } from '../../share/judge/element';
import { warnError } from '../../share/utiliy/error';
import { parseHTML } from './html-parse';
import { parseText } from './text-parse';
import { parseAttrs }  from './attr-parse';





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
				// isFor: false,
				// forkey: null,     vm-for专属数据
				// forSource: null
				// isIf: false,      vm-if标记
				// ifExp: null       vm-if表达式
				attrs:[],
				event:[],
				directive:[],
				children: [],
			}
			
			//编译处理提取到的attribute
			parseAttrs(element,attrs)
			//如果根节点不存在
			if(!root){
				if(element.isFor){
					return warnError('compiler error: rootElement  can`t  is vm-for directive')
				}
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















