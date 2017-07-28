
import { isObject } from '../share/judge/util';
import { warnError } from '../share/utiliy/error';


//虚拟节点
const Vnode =function(option){
    this.VnodeType = null;
    this.tagName = null;
    this.elm = null;
    this.attrs = null;
    this.children = null;
    this.events = null;
    this.directives = null;
    this.parent = null;
    this.text = null;
    this.empty = null;

    return this;
}



//构建虚拟节点
export var createVNodeElement = function(tag,attrs,children,events,directives,isRoot){
    var el = new Vnode()
    el.VnodeType = 1;
    el.tagName = tag;
    el.attrs = attrs;
    el.children = children;
    el.events = events;
    el.directives = directives;
    el.beforeNode = null;
    el.nextNode = null


    //根组件这里做下特殊处理 给子组件遍历一次 绑定父组件关系
    //这里可能存在性能损耗
    if(isRoot){
        el.parent = document.body;
        el.isRoot = true;
        if(Array.isArray(el.children) &&el.children.length > 0){
            childrenBindParent(el.children,el)
        }
    }

    //为子节点绑定父节点关系
    function childrenBindParent(children,parent){
        if(!Array.isArray(children) ||children.length === 0){
            return false;
        }
        for(var i=0; i<children.length ;i++){
            var node = children[i]
            //vm-for 接收的数据特殊处理 这里还不优雅 需要进一步处理
            if(Array.isArray(node)){
                node.map(function(item,index){
                    index = i+1+index;
                    children.splice(index,0,item);
                })
                children.splice(i,1);
                continue;
            }
            //建立兄弟节点关系 因为vm-for的关系 这里后期要重新处理
            if(i>0){
                node.beforeNode  =  children[i-1];
            }
            if(i <children.length ){
                 node.nextNode  =  children[i+1];
            }
            //建立父节点关系
            node.parent = parent
            if(Array.isArray(node.children) && node.children.length > 0){
                childrenBindParent(node.children,node)
            }
        }
    }
    return el;
}   



//构建虚拟文本节点
export var createVNodeText = function(text){
    var el = new Vnode()
    el.VnodeType = 2;
    el.text = text;
    return el;
}


//构建空的虚拟节点
export var createEmptyVnode = function(){
    var el = new Vnode();
    el.VnodeType = 1;
    el.empty  = true
    return el;
}


//创建列表虚拟节点
export var createListVNode = function(source,generatefn){
    if(!Array.isArray(source) && !isObject(source)){
        warnError('vm-for error: '+source+' is not array or object ')
    }
    var VNode = []
    if( Array.isArray(source)   ){
        VNode = source.map(function(item){
            return generatefn(item);
        })
    }else{
        for(var key in source){
            VNode.push( generatefn(source[key]) )
        }
    }
    return VNode
}





export default Vnode;





