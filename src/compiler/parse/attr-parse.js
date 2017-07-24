

//设置attribute映射
function setAttributeMap(attrs){
    var attribute = {};
    for(var i=0 ;i<attrs.length ;i++){
        attribute[attrs[i].name] = attrs[i].value; 
    }
    return attribute;
}



//提取attribute
function getAttributeMap(attrMap,attrKey){
    var keys = Object.keys(attrMap);
    if(keys.indexOf(attrKey) !== -1){
        var attrValue = attrMap[attrKey];
        delete attrMap[attrKey];
        return attrValue;
    }
}



//处理vm-model
function processModel(elm,attrKey,attrMap){
    if(attrKey !== 'vm-model'){
        return false;
    }
    elm.modelExp = getAttributeMap(attrMap,attrKey);
}




//处理剩余attr
function processSurplus(elm,attrMap){
    for(var key in attrMap){
        var attr = {};
        attr.name = key;
        attr.value = getAttributeMap(attrMap,key)
        elm.attrs.push(attr);
    }
}



//编译节点属性
export function parseAttrs(astElm ,attrs){
    var attrsMap = setAttributeMap(attrs)
    var elm = astElm;
    for(var i=0; i<attrs.length; i++){
        var key = attrs[i].name;
        //如果是绑定模式
        processModel(elm,key,attrsMap);
    }
    //处理剩余的attr
    processSurplus(elm,attrsMap)
}






