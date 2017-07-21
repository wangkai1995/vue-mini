

var did = 0;



//辅助绑定对象
const Dep = function(){
    this.id = did++;
}




export default Dep;



