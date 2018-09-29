import {
    cerateElementBindAddParent
} from './patch/create.js'
import {
    updateElement,
    removeElement
} from './patch/update.js'




//将虚拟节点更新到真实DOM中
export var patch = function(oldNode, Vnode, isRoot) {
    //是否是根节点 并且老节点是空节点
    if (isRoot && oldNode.empty) {
        //创建新元素 更新到DOM
        cerateElementBindAddParent(Vnode, Vnode.parent);
        //删除老节点 从DOM中删除对应真实节点
        removeElement(oldNode)
    } else if (oldNode && Vnode) {
        //不是的话 那么更新对比节点
        updateElement(oldNode, Vnode)
    }
    return Vnode;
}