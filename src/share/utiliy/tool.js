
import warnError from './error';



//设置映射
export var makeMap = function(key,valueString){
	var map = {};
	var list = (typeof valueString === 'string')? valueString.split(',') : valueString.toString().split(',');
	if(Array.isArray(list) && list.length > 0){
		map[key] = list
	}else{
		warnError('set map error: valueString type error or value error')
		return false;
	}
	return function(value){
		return map[key].indexOf(value) !== -1? true : false;
	}
}




//构建转译字符串
export var toStringify = function(text){
    if(typeof text === 'string'){
        return text;
    }
    return text.toString();
}


//方法中绑定当前作用域
export var bind = function(event){
    var self = this;
    return function(){
        event.apply(self,arguments)
    }
}




