
import VueMini from './instance/index';



window.onload = function(){
	

	var test = new VueMini({
		el:'#test',
        data: {
            name:'小二',
            age:17,
            family:{
                parent:'老王',
                mother:'小丽',
            }
        },
	})
	
}



