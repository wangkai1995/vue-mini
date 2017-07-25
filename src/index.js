
import VueMini from './instance/index';



window.onload = function(){
	

	var test = new VueMini({
		el:'#test',
        data: {
            name:'阿迪王',
            age:17,
            family:{
                parent:'老王',
                mother:'小丽',
            }
        },
        method:{
            testClick:function(el){
                console.log('点击了测试方法,点击的元素属性为',el)
            }
        }
	})
	
}



