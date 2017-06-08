/**
 * Created by kjoshi on 4/11/17.
 */

//_.get('a.b.c.d.e');

"use strict";

const Util = {
    isObject: function (o) {
        return o && (typeof o === "object");
    },
    findByXPath: (function () {
        function get(obj, path) {
            var val = obj[path[0]];
            path = path.slice(1);
            if (path.length === 0) {
                return val;
            }
            if (Util.isObject(val) && path[0] in val) {
                return get(val, path);
            }

            throw new Error("value not found");
        }

        return function find(obj, xpath) {
            if (obj === undefined) {
                throw new Error("No obj passed");
            }
            if (!xpath) {
                throw new Error("No xpath passed");
            }
            xpath = xpath.split(".");

            return get(obj, xpath);
        }
    })(),
    flattenXPath: (function () {
        function flatIt(obj, retObj, parentKey) {
            var val, flatKey;
            for (var key in obj) {
                val = obj[key];
                flatKey = (parentKey ? (parentKey + ".") : "") + key;
                if (Util.isObject(val)) {
                    flatIt(val, retObj, flatKey);
                } else {
                    retObj[flatKey] = val;
                }
            }
        }

        return function flatten(obj) {
            if (!obj) {
                throw new Error("No object passed");
            }
            var retObj = {};
            flatIt(obj, retObj);
            return retObj;
        }
    })()
};


var obj = {
    a: {
        b: {
            c: 10
        },
        d: 20
    }
};


//driver function
//console.log(Util.findByXPath(obj, "a.b"));
//console.log(Util.flattenXPath({
//    foo: {
//        bar: 1,
//        baz: 2,
//        abc: {
//            a: 0
//        }
//    },
//    'hello': 3
//}));

//console.log(Util.flattenXPath(obj));

function doSum(a) {
    if (a == undefined) {
        return;
    }

    //sum = (sum || 0 ) + a;
    return function (a1) {
        if (a1 === undefined) {
            return a;
        }
        return doSum(a + a1);
    }
}

//console.log(doSum(10)(20)(25)());

function Test() {
    console.log("Test");
}

Test.prototype.fn = function () {
    console.log("fn");
};

Object.createPoly = function (proto) {
    function T() {
    }

    //Test.prototype =
    T.prototype = proto;
    return new T();
};

function B() {
    console.log("B");
}
B.prototype = Object.createPoly(Test.prototype);
B.prototype.constructor = B;

var obj1 = new B();
obj1.fn();

//function Promise(fn) {
//    var self = this;
//    fn(function (val) {
//        if (!self.__error) {
//            self.__resolved = val;
//            if (self.__thenCb && self.__thenCb.length > 0) {
//                while (self.__thenCb.length > 0) {
//                    (self.__thenCb.splice(0, 1)[0])(self.__resolved);
//                }
//            }
//            //self.__thenCb && self.__thenCb(val);
//        }
//    }, function (e) {
//        if (!self.__resolved) {
//            self.__error = e;
//            self.__catchCb && self.__catchCb(e);
//        }
//    });
//}
//
//Promise.prototype.then = function (cb) {
//    if (this.__resolved) {
//        cb(this.__resolved);
//    } else {
//        this.__thenCb = (this.__thenCb || []);
//        this.__thenCb.push(cb);
//    }
//    return this;
//};
//
//Promise.prototype.catch = function (cb) {
//    if (this.__error) {
//        cb(this.__error);
//    } else {
//        this.__catchCb = cb;
//    }
//    return this;
//};
//
//var myPromise = new Promise(function (resolve, reject) {
//    setTimeout(function () {
//        console.log("done");
//        resolve(200);
//        reject("Error");
//    }, 1000);
//});
//
//console.log("calling then before promise resolve");
//myPromise.then(function () {
//    console.log("done----1");
//
//}).then(function (val) {
//    console.log("done----2");
//});
//
//setTimeout(function () {
//    console.log("calling then after promise resolve");
//    myPromise.then(function (val) {
//        console.log("done called:", val)
//    }).catch(function (e) {
//        console.error("error:", e);
//    });
//}, 2000);
//
//
//function arrayFlatten(arr) {
//    var val, retArr = [];
//    for (var i = 0; i < arr.length; i++) {
//        val = arr[i];
//        if (Array.isArray(val)) {
//            retArr = retArr.concat(arrayFlatten(val));
//        } else {
//            retArr.push(val)
//        }
//    }
//    return retArr;
//}
//
//console.log(arrayFlatten([1, [2], [3, [4]]])); // [1, 2, 3, 4]