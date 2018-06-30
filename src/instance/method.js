

import { defineEventProxy } from '../observer/proxy';





export var initMethod = function(vue){
	vue._method = vue._option.method? vue._option.method : false ;
	if(vue._method){
	    //绑定数据代理,将method数据赋值给自己
    	defineEventProxy(vue)
	}
}





