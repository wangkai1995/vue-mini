export var isObject = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}



export var isEmpty = function(obj) {
    if (!obj) {
        return true;
    }
    for (var key in obj) {
        return false;
    }
    return true;
}


export var isElement = function(value) {
    return (
        typeof HTMLElement === 'object' ? value instanceof HTMLElement : //DOM2
        value && typeof value === "object" && value !== null && value.nodeType === 1 && typeof value.nodeName === "string"
    );
}


export function isUndefined(value) {
    return value === undefined;
}