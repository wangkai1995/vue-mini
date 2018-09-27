import {
    parse
} from './parse/index';
import {
    generateCode
} from './generate';





//编译模板字符串为可执行函数
export var compileTemplateToFn = function(template, options, context) {
    //开始解析模板 生成虚拟元素
    var ast = parse(template.trim(), options);
    // console.log('AST',ast)

    var render = generateCode(ast, options.rootEl);
    // console.log('render', render)
    // debugger;

    return new Function(render);
}