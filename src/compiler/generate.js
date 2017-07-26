


//编译生成可执行code
export var generateCode = function(AST){
    var tag = AST.tagName;
    var attrs = genreateAttr(AST.attrs);
    var children = generateChildren(AST.children)
    var EventCode = generateEvent(AST.event);
    var directiveCode = generateDirective(AST.directive);

    return 'with(this){return _c("'+tag+'",'+attrs+','+children+','+EventCode+','+directiveCode+',true)}'
}




//生成子节点Code函数
function generateChildren(children){
    if(!Array.isArray(children)|| children.length ===0 ){
        return '[]';
    }
    var CodeList = [];
    for(var i=0; i<children.length; i++){
        var node = children[i];
        switch(node.type){
            case 1:
                //解析生成事件
                var EventCode = generateEvent(node.event);
                //解析指令
                var directiveCode = generateDirective(node.directive);
                //递归绑定子节点
                if( Array.isArray(node.children)||node.children.length >0 ){
                    CodeList.push('_c("'+node.tagName+'",'+genreateAttr(node.attrs)+','+generateChildren(node.children)+','+EventCode+','+directiveCode+')');
                }else{
                    CodeList.push('_c("'+node.tagName+'",'+genreateAttr(node.attrs)+',[],'+EventCode+','+directiveCode+')');
                }
                break;
            case 2:
                CodeList.push('_v(_s('+node.exp+'))');
                break;
            case 3:
                CodeList.push('_v("'+node.text+'")');
                break;

        }
    }
    return '['+CodeList.join(',')+']'
}




//生成事件Code函数
function generateEvent(events){
    if( !Array.isArray(events)|| events.length ===0 ){
        return '[]';
    }

    var EventCodeList = [];
    
    for(var i=0; i<events.length ;i++){
        var eve = events[i];
        EventCodeList.push('{name:"'+eve.name+'",exp:_method["'+eve.exp+'"]}')
    }

    return '['+EventCodeList.join(',')+']'
}




//生成指令Code函数
function generateDirective(directives){
    if( !Array.isArray(directives)|| directives.length ===0 ){
        return '[]';
    }

    var directiveCode = [];
    for(var i=0; i<directives.length ;i++){
        var direc = directives[i];
        if(direc.name === 'model'){
            directiveCode.push('{name:"'+direc.name+'",exp:function(val){ '+direc.exp+' = val },value:'+direc.exp+'}')
            continue;
        }
        if(direc.name === 'for'){
            console.log(directives)
            continue;
        }
    }

    return '['+directiveCode.join(',')+']'
}




//生成attributeCode函数
function genreateAttr(attrs){
    var attrsCode = {};
    if(!Array.isArray(attrs) || attrs.length === 0){
        return '{}';
    }
    for(var i=0 ;i<attrs.length ;i++){
        attrsCode[attrs[i].name] = attrs[i].value;
    }
    return JSON.stringify(attrsCode);
}






