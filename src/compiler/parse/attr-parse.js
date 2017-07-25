
var eventReg = /vm-on([a-zA-Z]+)/;
var directiveReg = /vm-([a-z]+)/;


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



//编译节点属性
export function parseAttrs(astElm ,attrs){
    var attrsMap = setAttributeMap(attrs)
    var elm = astElm;
    for(var i=0; i<attrs.length; i++){
        var key = attrs[i].name;
        //处理指令
        processDirective(elm,key,attrsMap);
        //处理事件
        processEvent(elm,key,attrsMap)
    }
    //处理剩余的attr
    processSurplus(elm,attrsMap)
}




//处理vm-xxx等指令
function processDirective(elm,attrKey,attrMap){
    if( !directiveReg.test(attrKey) || /vm-on/.test(attrKey) ){
        return false;
    }
    var directive = {};
    directive.name = attrKey.match(directiveReg)[1];
    directive.exp = getAttributeMap(attrMap,attrKey);
    elm.directive.push(directive);
}




//处理vm-XXXX事件
//未完成
function processEvent(elm,attrKey,attrMap){
    if( !eventReg.test(attrKey) ){
        return false;
    }
    var event = {}
    event.name = attrKey.match(eventReg)[1].toLowerCase();
    event.exp = getAttributeMap(attrMap,attrKey);
    elm.event.push(event);
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






