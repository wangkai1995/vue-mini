
import { warnError } from '../../share/utiliy/error';

//捕获事件
var eventReg = /vm-on([a-zA-Z]+)/;
//捕获事件是否穿参数
var eventParamsReg = /([a-zA-Z,"']+)\(([$a-zA-Z,"']+)\)/
//捕获指令
var directiveReg = /vm-([a-z]+)/;
//捕获vnm-for内容
var forReg = /^\s*([\w]+)\s*in\s*([\w]+)/;



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
    //特殊处理vm-if
    processIf(elm)
    //特殊处理vm-for
    processFor(elm)
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



//处理vm-if指令
function processIf(elm){
    if(!Array.isArray(elm.directive) || elm.directive.length === 0){
        return false;
    }
    var directive;
    for(var i=0 ; i<elm.directive.length ;i++){
        if(elm.directive[i].name === 'if'){
            directive = elm.directive[i];
            break;
        }
    }
    if(!directive){
        return false;
    }
    elm.isIf = true;
    elm.ifExp = directive.exp;
    elm.directive.splice(i,1);
}


//处理vm-for指令
function processFor(elm){
    if(!Array.isArray(elm.directive) || elm.directive.length === 0){
        return false;
    }
    var directive;
    for(var i=0 ; i<elm.directive.length ;i++){
        if(elm.directive[i].name === 'for'){
            directive = elm.directive[i];
            break;
        }
    }
    if(!directive){
        return false;
    }
    elm.isFor = true;
    var forMatch = directive.exp.match(forReg);
    if(forMatch && forMatch[1] && forMatch[2]){
        elm.forkey = forMatch[1];
        elm.forSource = forMatch[2];
    }else{
        warnError('compiler error: directive vm-for parse is error')
        elm.isFor = false;
        return false;
    }
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
    
    //如果存在包裹参数
    if(eventParamsReg.test(event.exp)){
        var exp = event.exp.match(eventParamsReg)[1]
        var params = event.exp.match(eventParamsReg)[2];
        //判断是否传入多个参数
        if(params.indexOf(',') > -1){
            params = params.split(',')
        }
        event.params = params;
        event.exp = exp;
    }
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






