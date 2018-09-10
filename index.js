import VueMini from './src/instance/index';

// window.VueMini = VueMini;
// module.exports = VueMini;

window.onload = function() {

    var family = [{
        relation: '父亲',
        name: '老王'
    }, {
        relation: '母亲1',
        name: '乱写的'
    }, {
        relation: '母亲2',
        name: '乱写的'
    }, {
        relation: '母亲3',
        name: '乱写的'
    }, {
        relation: '母亲4',
        name: '乱写的'
    }, {
        relation: '母亲5',
        name: '乱写的'
    }, ]

    var test = new VueMini({
        el: '#test',
        data: {
            name: '阿迪王',
            age: 17,
            testShow: false,
            time: new Date().toLocaleString(),
            family: family,
        },
        method: {
            testClick: function(el) {
                console.log('点击了测试方法,点击的元素属性为', el)
                test.time = new Date().toLocaleString();
            }
        }
    })


    // var time = setInterval(function(){
    //     test.age += 1;
    //     test.testShow = !test.testShow ;
    //     if( test.age< 20){
    //         test.family.splice(4,0,{relation:'阿里巴巴',name:'四十大盗'});  
    //     }
    //     if(test.age > 20 && test.age < 22){
    //         test.family.splice(2,0,{relation:'走四方',name:'我来也'}); 
    //     }
    // },1000)

}