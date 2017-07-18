

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



//解析html
export default var parseHTML = function(html, option){
	
}




