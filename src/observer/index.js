

import Dep from './dep';
import { isObject } from '../share/judge/util';



export var defineDataToObserver = function(data){

    var keys = Object.keys(data);
    var dep = new Dep();

    for(var i=0;i<keys.length ;i++){
        var key = keys[i]
        if( isObject(data[key]) || Array.isArray(data[key]) ){
            defineDataToObserver(data[key])
        }else{
            defineObserver(data,key,data[key])
        }
    }

    //绑定观察者
    function defineObserver(target,key,value){
        Object.defineProperty(target,key,{
            configurable: false,
            enumerable: true,
            set:function(newVal){
                if(value === newVal){
                    return 
                }
                value = newVal;
            },
            get:function(){
                return value;
            }
        })
    }
    
}














