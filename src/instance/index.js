import {
    toStringify,
    warnError,
    bind
} from '../share/utiliy/index';
import {
    initCompiler
} from './render';
import {
    initData
} from './data';
import {
    initMethod
} from './method';

import Watcher from '../observer/watcher';

import {
    createVNodeElement,
    createVNodeText,
    createListVNode,
} from '../Vnode/index';


var uid = 0;

const VueMini = function(option) {
    if (!option) {
        warnError('Init error :option not undefined')
        return this;
    }
    this.id = uid++;
    this.self = this;
    this._el = option.el
    this._option = option;
    this._rootParent = option.rootParent ? option.rootParent : '';

    //生命周期 后面还需完善
    if (option.updated && typeof option.updated === 'function') {
        this.updated = option.updated
    }

    if (option.mounted && typeof option.mounted === 'function') {
        this.mounted = option.mounted
    }

    //执行初始化
    this.$init();

}



/**************  原型方法   ***************/
//初始化
VueMini.prototype.$init = function() {
    //初始化编译	
    initCompiler(this);
    //初始化data数据建立绑定
    initData(this);
    //初始化mothod方法
    initMethod(this)

    //开始挂载
    this.$mount();

    return this;
}



//挂载
VueMini.prototype.$mount = function() {
    if (!this._render) {
        warnError('$mount error: VueMini._render  is not defined')
    }
    var $render = this._render;
    this._watcher = new Watcher(this, $render);
}



/**********   render中使用  ***********/
VueMini.prototype._s = toStringify;
VueMini.prototype._c = createVNodeElement;
VueMini.prototype._v = createVNodeText;
VueMini.prototype._l = createListVNode;
VueMini.prototype._e = bind



export default VueMini;