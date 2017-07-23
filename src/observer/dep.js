

var did = 0;


//辅助绑定对象
const Dep = function(){
    this.id = did++;
    this.sub = [];
}
//全局对象
Dep.target = null
//添加watcher
Dep.prototype.add = function(watcher){
	this.sub.push(watcher);
}
//通知watcher更新
Dep.prototype.notify = function(){
	for(var i=0; i<this.sub.length ;i++){
		this.sub[i].update();
	}
}



export var setDepTarget = function(target){
	Dep.target = target;
};

export var clearDepTarget = function(){
	Dep.target = null;
}



export default Dep;



