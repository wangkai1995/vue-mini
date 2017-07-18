




//抛出错误警告
export var warnError = function(error,fn){
	console.error(error)
	if(fn){
		fn();
	}
}






