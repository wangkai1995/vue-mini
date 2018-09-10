// import VConsole from 'vconsole';
// var vConsole = new VConsole();

var warnError = function(error, fn) {
    console.error(error)
    console.log(error)
    if (fn) {
        fn();
    }
}

//抛出错误警告
export default warnError