



//虚拟节点
const Vnode =function(option){
    this.VnodeType = null;
    this.tagName = null;
    this.elm = null;
    this.attrs = null;
    this.children = null;
    this.parent = null;
    this.text = null;
    this.empty = null;

    return this;
}




//构建虚拟节点
export var createVNodeElement = function(tag,attrs,children,isRoot){
    var el = new Vnode()
    el.VnodeType = 1;
    el.tagName = tag;
    el.attrs = attrs;
    el.children = children;

    //根组件这里做下特殊处理 给子组件遍历一次 绑定父组件关系
    //这里可能存在性能损耗
    if(isRoot){
        el.parent = document.body;
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





export default Vnode;





