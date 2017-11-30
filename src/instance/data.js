

import { defineDataProxy } from '../observer/proxy';
import { defineDataToObserver } from '../observer/index';





export var initData = function(vue){
    vue._data = vue._option.data;
    //绑定数据代理,将data数据赋值给自己

    defineDataProxy(vue);
    //建立绑定拦截
    defineDataToObserver(vue._data);
}





