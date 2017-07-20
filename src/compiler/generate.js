


//编译生成可执行code
export var generateCode = function(AST){
    var tag = AST.tagName;
    var attrs = genreateAttr(AST.attrs);
    var children = generateChildren(AST.children)


    return 'with(this){_c('+tag+','+attrs+','+children+')}'
}




//生成子节点Code函数
function generateChildren(children){
    if(!Array.isArray(children)|| children.length ===0 ){
        return false;
    }
    var Code
    for(var i=0 i<children.length; i++){

    }

}



//生成attributeCode函数
function genreateAttr(attrs){
    var attrsCode = [];
    if(!Array.isArray(attrs) || attrs.length === 0){
        return '[]';
    }

    for(var i=0 ;i<attrs.length ;i++){
        var attr = {}
        attr[attrs[i].name] = attrs[i].value;
        attrsCode.push(attr)
    }
    return JSON.stringify(attrsCode);
}



