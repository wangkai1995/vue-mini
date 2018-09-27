import {
    parseText
} from './parse/text-parse';


//编译生成可执行code
export var generateCode = function(AST) {
    var tag = AST.tagName;
    var attrs = genreateAttr(AST.attrs);
    var children = generateChildren(AST.children)
    var EventCode = generateEvent(AST.event);
    var directiveCode = generateDirective(AST.directive);

    return 'with(this){return _c("' + tag + '",' + attrs + ',' + children + ',' + EventCode + ',' + directiveCode + ',_rootParent)}'
}



//vm-for directive特殊生成
function generateForCode(node) {
    var tag = node.tagName;
    var attrs = genreateAttr(node.attrs);
    var children = generateChildren(node.children)
    var EventCode = generateEvent(node.event);
    var directiveCode = generateDirective(node.directive);
    return '_l(' + node.forSource + ',function(' + node.forkey + ',$index){ return _c("' + tag + '",' + attrs + ',' + children + ',' + EventCode + ',' + directiveCode + ')})'
}



//vm-if directive特殊生成
function generateIFCode(node) {
    var tag = node.tagName;
    var type = node.type
    var ifExp = node.ifExp;
    switch (type) {
        case 1:
            var attrs = genreateAttr(node.attrs);
            var children = generateChildren(node.children)
            var EventCode = generateEvent(node.event);
            var directiveCode = generateDirective(node.directive);
            return '(' + ifExp + ')? _c("' + tag + '",' + attrs + ',' + children + ',' + EventCode + ',' + directiveCode + '): _v("")'
        case 2:
            return '(' + ifExp + ')? _v(_s(' + node.exp + ')) : _v("")'
        case 3:
            return '(' + ifExp + ')? _v("' + node.text + '") : _v("")'
    }
    return '_v("")'
}



//生成子节点Code函数
function generateChildren(children) {
    if (!Array.isArray(children) || children.length === 0) {
        return '[]';
    }
    var CodeList = [];
    for (var i = 0; i < children.length; i++) {
        var node = children[i];
        //如果是vm-for命令特殊处理
        if (node.isFor) {
            CodeList.push(generateForCode(node))
            continue;
        }
        //如果是vm-if命令特殊处理
        if (node.isIf) {
            CodeList.push(generateIFCode(node))
            continue;
        }
        //普通子节点处理
        switch (node.type) {
            case 1:
                //解析生成事件
                var EventCode = generateEvent(node.event);
                //解析指令
                var directiveCode = generateDirective(node.directive);
                //递归绑定子节点
                if (Array.isArray(node.children) || node.children.length > 0) {
                    CodeList.push('_c("' + node.tagName + '",' + genreateAttr(node.attrs) + ',' + generateChildren(node.children) + ',' + EventCode + ',' + directiveCode + ')');
                } else {
                    CodeList.push('_c("' + node.tagName + '",' + genreateAttr(node.attrs) + ',[],' + EventCode + ',' + directiveCode + ')');
                }
                break;
            case 2:
                CodeList.push('_v(_s(' + node.exp + '))');
                break;
            case 3:
                CodeList.push('_v("' + node.text + '")');
                break;
        }
    }
    return '[' + CodeList.join(',') + ']'
}



//生成事件Code函数
function generateEvent(events) {
    if (!Array.isArray(events) || events.length === 0) {
        return '[]';
    }

    var EventCodeList = [];

    for (var i = 0; i < events.length; i++) {
        var eve = events[i];
        if (eve.params) {
            EventCodeList.push('{name:"' + eve.name + '",exp:_e(' + eve.exp + '),params:[' + eve.params + ']}')
        } else {
            EventCodeList.push('{name:"' + eve.name + '",exp:_e(' + eve.exp + ')}')
        }
    }

    return '[' + EventCodeList.join(',') + ']'
}



//生成指令Code函数
function generateDirective(directives) {
    if (!Array.isArray(directives) || directives.length === 0) {
        return '[]';
    }

    var directiveCode = [];
    for (var i = 0; i < directives.length; i++) {
        var direc = directives[i];
        if (direc.name === 'model') {
            directiveCode.push('{name:"' + direc.name + '",exp:function(val){ ' + direc.exp + ' = val },value:' + direc.exp + '}')
            continue;
        }
        if (direc.name === 'class') {
            directiveCode.push('{name:"' + direc.name + '",exp:' + direc.exp + '}')
            continue;
        }
        if (direc.name === 'show') {
            directiveCode.push('{name:"' + direc.name + '",exp:' + direc.exp + '}')
            continue;
        }
    }

    return '[' + directiveCode.join(',') + ']'
}



//生成attributeCode函数
function genreateAttr(attrs) {
    var expReg = /\{\{((?:.|\n)+?)\}\}/;
    var attrsCode = '{';
    if (!Array.isArray(attrs) || attrs.length === 0) {
        return '{}';
    }
    for (var i = 0; i < attrs.length; i++) {
        //判断表达式中间是否有解析式
        var exp = parseText(attrs[i].value)
        if (!exp) {
            attrsCode += '"' + attrs[i].name + '":'
            attrsCode += '"' + attrs[i].value + '"'
        } else {
            attrsCode += '"' + attrs[i].name + '":'
            attrsCode += exp;
        }
        if ((i + 1) < attrs.length) {
            attrsCode += ','
        }
    }
    attrsCode += '}'
    return attrsCode
}