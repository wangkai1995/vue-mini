







export default var parse = function(template ,options){
	var stack == [];
	var currentParent ;	
	
	//开始解析
	parseHTML(template,{
		warnError : options.warnError,
		//处理开始标签
		start: function(tag,attrs,unary){

		}
		//处理结束标签
		end: function(){

		}
		//处理文本
		chars: function(text){

		}
	})
}








