// import VConsole from 'vconsole';
// var vConsole = new VConsole();





//抛出错误警告
export var warnError = function(error, fn) {
    console.error(error)
    if (fn) {
        fn();
    }
}