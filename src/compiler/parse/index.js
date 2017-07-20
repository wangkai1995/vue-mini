
import { isReservedTag ,isNonPhrasingTag ,canBeleftOpenTag ,isUnaryTag } from '../../share/judge/element';
import { parseHTML } from './html-parse';



export  var parse = function(template ,options){
	var stack = [];
	var currentParent ;	
	
	//开始解析
	parseHTML(template,{
		warnError : options.warnError,
		isReservedTag: isReservedTag,
		isNonPhrasingTag: isNonPhrasingTag,
		canBeleftOpenTag: canBeleftOpenTag,
		isUnaryTag: isUnaryTag,
		//处理开始标签
		start: function(tag,attrs,unary){

		},
		//处理结束标签
		end: function(){

		},
		//处理文本
		chars: function(text){

		}
	});
}








