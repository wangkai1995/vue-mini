



//设置代理
export var defineDataProxy = function(vue){
    for(var key in vue._data){
        setProxy(vue,'_data',key);
    }
    //当前目前属性映射到_data
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
}




