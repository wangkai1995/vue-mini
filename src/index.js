
import VueMini from './instance/index';



window.onload = function(){
	var family = [{relation:'父亲',name:'老王'},{relation:'母亲',name:'乱写的'}];
	var test = new VueMini({
		el:'#test',
        data: {
            name:'阿迪王',
            age:17,
            time: new Date().toLocaleString(),
            family:family,
        },
        method:{
            testClick:function(el){
                console.log('点击了测试方法,点击的元素属性为',el)
                test.time = new Date().toLocaleString();
            }
        }
	})

    setInterval(function(){
        test.age += 1;
    },1000)
	
}





