
import { isUndefined } from '../share/judge/util';

//当前目前属性映射到scopeKey
function setProxy(target,scopeKey,key){
    var objDefineProperty = {
        configurable: false,
        enumerable: true,
        set:function(value){
            target[scopeKey][key] = value;
        },
        get:function(){
            return target[scopeKey][key];
        }
    }
    Object.defineProperty(target,key,objDefineProperty)
}



//设置代理
export var defineDataProxy = function(vue){
    //当前目前属性映射到_data
    for(var key in vue._data){
        if(isUndefined(vue[key])){
            setProxy(vue,'_data',key);
        }
    }
}



//设置事件代理
export var defineEventProxy = function(vue){
    //当前目前属性映射到_method
    for(var key in vue._method){
        if(isUndefined(vue[key])){
            setProxy(vue,'_method',key);
        }
    }
}



