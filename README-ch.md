# Vue-mini

##### **这是一个用于学习！~基于vue.js编写的mini MVVM库**

- **关于vue-mini:**    这是一个基于vue.js:MVVM方式编写的Mini框架, 
  - 只保留了核心MVVM等语法糖v-model, Vnode等 。 PS：0.0.0版本并未添加diff patch，
  - 关于DOM事件绑定修改为：例如 @click修改为vm-onClick,
  - 一些常用指令包括: { v-if=vm-if, v-class=vm-class,  v-for=vm-for, v-show=vm-show, v-model=vm-model }
  -  v-bind方式重新修改 例如 <p class="container"  :class="testClass"></p>  =>  <p class="container {{testClass}}" ></p>;,
  - 生命周期保留mounted,updated，
  - 其他功能全部删除，压缩后大小为17kb, 目前我在webView activity H5中使用
- **兼容与支持:**  同vue.js



## Installation

请使用 npm安装包

```
npm install vue-mini
```



## Examples

#### 	一个简单的使用例子

html:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<meta name="viewport" content="width=device-width,height=device-height, user-scalable=no,initial-scale=1, minimum-scale=1, maximum-scale=1,target-densitydpi=device-dpi ">  
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<meta name="renderer" content="webkit">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>vue-mini</title>
		<style>
			.item{
				padding:5px;
			}
			.test{
				font-size: 20px;
				margin-top: 20px;
				display: inline-block;
			}
			.active{
				color:#f30;
			}
		</style>
	</head>
	<body>

		<div id="test">
			<h5     
				style="color:#f50;font-size:16px;" 
				vm-onClick="testClick"
			>
				点我获取当前时间:{{time}}
			</h5>
			<p 
				style="color:#f50;font-size:16px" 
				vm-show="false"
			>
				用来测试vm-show的
			</p>
			他的名字: {{name}}<br>
			<span 
				class="test" 
				vm-class="{'active':testShow}"
			>
				今年的年龄是{{age}}
			</span>
			<p>
				<input type="text" vm-model="name" />
			</p>
			<p  vm-if="testShow">是个男孩</p>
			<div 
				vm-for="item in family" 
				class="item"
			>
				家人名字是:{{item.name}},<span>关系是{{item.relation}} </span>
			</div>
		</div>
	</body>
</html>

```



js:

```javascript
import VueMini from 'vue-mini';

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
    
    test.testClick();
    
    var time = setInterval(function() {
        test.age += 1;
        test.testShow = !test.testShow;
        if (test.age < 20) {
            test.family.splice(4, 0, {
                relation: '阿里巴巴',
                name: '四十大盗'
            });
        }
        if (test.age > 20 && test.age < 22) {
            test.family.splice(2, 0, {
                relation: '走四方',
                name: '我来也'
            });
        }
    }, 1000)
}
```

##### 	



	

