


export var isObject = function(obj){
    return Object.prototype.toString.call(obj)  === '[object Object]';
}



export var isEmpty = function(obj){
    if( !obj ){
        return true;
    }
    for(var key in obj){
        return false;
    }
    return true;
}






