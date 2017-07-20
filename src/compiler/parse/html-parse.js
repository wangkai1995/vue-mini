


//捕获attribute的正则
// key = /^\s*([^\s"'<>\/=]+)/
// assing = /?:\s*((?:=))/
// value = /\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+))/
var attributeReg = /^\s*([^\s"'<>\/=]+)(?:\s*((?:=))\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/


//标签名
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:'+ ncname +'\\:)?'+ ncname +')';

//开始标签开头
var startTagOpen = new RegExp('^<'+qnameCapture);
//开始标签结束
var startTagClose = /^\s*(\/?)>/;
//结束标签
var endTag = new RegExp('^<\\/'+qnameCapture+'[^>]*>');

//doctype
var doctype = /^<!DOCTYPE [^>]+>/i;
//comment
var comment = /^<!--/;
//conditional
var conditionalComment = /^<!\[/


//火狐正则bug
var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g,function(m,g){
	IS_REGEX_CAPTURING_BROKEN = g === ''
});

//特殊文本标签
var isPlainTextElement = ['script','style','textarea'];

//解码映射
var decodMap = {
	'&lt' : '<',
	'&gt' : '>',
	'&quot' : '"',
	'&amp' : '&',
	'&#10' : '\n'   //IE textarea特殊换行解析
}

const encodeAttr = /&(?:lt|gt|quot|amp);/g;
const encodeAttrIe = /&(?:lt|gt|quot|amp|#10);/g;


function decodeAttr (value,isIE){
	var re = isIE? encodeAttrIe: encodeAttr;
	return value.replace(re,match =>decodMap[match]);
}

//缓存
var reCache = {};


//解析html
export var parseHTML = function(html, option){
		var stack = [];
		//是否保留节点
		var isReservedTag = option.isReservedTag;
		//是否不可嵌套节点
		var canBeleftOpenTag = option.canBeleftOpenTag;
		//是否自闭和节点
		var isUnaryTag = option.isUnaryTag;
		//解析下标
		var index = 0;
		var last , lastTag;
		//解析开始
		while(html){
			last = html;
			if( !lastTag || !isReservedTag(lastTag) ){
				//找到标签开始
				var textEnd = html.indexOf('<');
				//开始标签
				if(textEnd === 0){
					//判断是否是注释
					if( comment.test(html) ){
						var commentEnd = html.indexOf('-->');
						if(commentEnd >= 0){
							advance(commentEnd + 3);
							continue;
						}
					}
					//判断条件标签
					if( conditionalComment.test(html) ){
						var conditionalEnd = html.indexOf(']>');
						if( conditionalEnd >=0 ){
							advance(conditionalEnd + 2);
							continue;
						}
					}
					//DOCTYPE
					var doctypeMatch = html.match(doctype);
					if( doctypeMatch ){
						advance( doctypeMatch[0].length );
						continue;
					}
					//结束标签
					var endTagMatch = html.match(endTag);
					if( endTagMatch ){
						var curIndex = index;
						advance( endTagMatch[0].length );
						parseEndTag(endTagMatch[1],curIndex,index);
						continue;
					}						
					//开始标签
					var startTagMatch = parseStartTag();
					if(startTagMatch){
						handleStartTag(startTagMatch);
						continue;
					}
				}
				
				debugger;
				//文本内容
				var text, rest , next;
				if(textEnd >= 0){
					//文本内容
					rest = html.slice(textEnd);
					
					while(
						!endTag.test(rest)&&
						!startTagOpen.test(rest)&&
						!comment.test(rest)&&
						!conditionalComment.test(rest)
					){
						next = rest.indexOf('<',1)
						if(next < 0) break;
						textEnd += next;
						rest = html.slice(textEnd);
					}

					text = html.substring(0,textEnd);
					advance(textEnd);
				}

				if(textEnd < 0){
					text = html;
					html = '';
				}

				if(option.chars && text){
					option.chars(text)
				}
			} else {
				var stackedTag = lastTag.toLowerCase();
				var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</'+ stackedTag +')','i'));
				var endTagLength = 0;
				var rest = html.replace(reStackedTag,function(all,text,endTag){
					endTagLength = endTag.length;
					if(!isPlainTextElement(stackedTag) && stackedTag !== 'noscript'){
						text = text
							.replace(/<!--([\s\S]*?)-->/g,'$1')
							.replace(/<!\[CDATA\[([\s\S]*?)]]/g,'$1')
					}
					if(options.chars){
						options.chars(text)
					}
					return '';
				})
				index += html.length - rest.length;
				html = rest;
				parseEndTag(stackedTag, index-endTagLength , index);
			}

			if(html === last){
				options.chars && options.chars(html)
				if(!stack.length){
					options.warn('template 解析出错了')
					break;
				}
			}
		}

		//处理结束
		parseEndTag();

		//向前推进
		function advance(n){
			index += n;
			html = html.substring(n);
		}


		//解析开头标签
		function parseStartTag(){
			var tagMatch = html.match(startTagOpen)
			var end , attr ;
			if( tagMatch ){
				var match = {
					tagName:tagMatch[0],
					attrs:[],
					start:index,
				}
				advance(tagMatch[0].length)

				while( !(end = html.match(startTagClose)) && (attr = html.match(attributeReg)) ){
					if(attr){
						advance(attr[0].length);
						match.attrs.push(attr);
					}
				}

				if(end){
					match.unarySlash = end[1];
					match.end = index;
					advance(end[0].length)
				}

				return match;
			}
		}
		

		//解析结束标签
		function parseEndTag(tagName , start , end){
		}


		//处理标签内容
		function handleStartTag(match){
			var tagName = match.tagName;
			var unarySlash = match.unarySlash;
			
		}

}







