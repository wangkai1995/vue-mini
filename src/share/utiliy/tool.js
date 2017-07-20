
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



