# Vue-mini

 **[中文版本](https://github.com/vue-mini/blob/master/README-ch.md)**

#####  **This is a monitored library used in javaScript**

- **About vue-mini:**  This is a mini framework based on Vue. Js: MVVM, 
    - Only the core MVVM syntax sugar V-model, vnode and so on. Ps: version 0.0.0 does not add diff patch，
    - Change the DOM event binding to: for example @ Click to vm-onclick,
    - Some common directives include:: { v-if=vm-if, v-class=vm-class,  v-for=vm-for, v-show=vm-show, v-model=vm-model }
    - V-bind mode re-modify for example <p class="container"  :class="testClass"></p>  =>  <p class="container {{testClass}}" ></p>;,
    - Lifecycle reserved mounted, updated，
    - All other features are removed and the compressed size is 17KB, which I currently use in WebView activity H5
- **Compatibility and support:** to vue.js



## Installation

```
npm install vue-mini
```



## Examples

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
				Click on me to get the current time:{{time}}
			</h5>
			<p 
				style="color:#f50;font-size:16px" 
				vm-show="false"
			>
				Used to test vm-show
			</p>
			His Name: {{name}}<br>
			<span 
				class="test" 
				vm-class="{'active':testShow}"
			>
				This year's age is{{age}}
			</span>
			<p>
				<input type="text" vm-model="name" />
			</p>
			<p  vm-if="testShow">It's a boy.</p>
			<div 
				vm-for="item in family" 
				class="item"
			>
				Family name is:{{item.name}},<span>The relationship is{{item.relation}} </span>
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
        relation: 'Father',
        name: 'old wang'
    }, {
        relation: 'Mother1',
        name: 'old li 2'
    }, {
        relation: 'Mother2',
        name: 'old li 3'
    }, {
        relation: 'Mother3',
        name: 'old li 4'
    }, {
        relation: 'Mother4',
        name: 'old li 5'
    }, {
        relation: 'Mother5',
        name: 'old li 6'
    }, ]

    var test = new VueMini({
        el: '#test',
        data: {
            name: 'Adi Wang',
            age: 17,
            testShow: false,
            time: new Date().toLocaleString(),
            family: family,
        },
        method: {
            testClick: function(el) {
                console.log('Click on the test method, click on the element attribute as', el)
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
                relation: 'aaaa',
                name: 'ooooo'
            });
        }
        if (test.age > 20 && test.age < 22) {
            test.family.splice(2, 0, {
                relation: 'yesyes',
                name: 'nono'
            });
        }
    }, 1000)
}
```

##### 	



