/**
 * Created by kjoshi on 4/21/17.
 */

function doSum(sum) {
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments);
        sum = 0;
        args.forEach(function (s) {
            sum += s;
        });
    }
    return function () {
        if (arguments.length === 0) {
            return sum;
        }
        Array.prototype.slice.call(arguments).forEach(function (s) {
            sum += s;
        });
        return doSum(sum);
    }
}

var arr = [];

function use(fn) {
    arr.push(fn);
}

use(function (next) {
    console.log(0);
    next();
});
use(function (next) {
    console.log(1);
    next();
});
use(function (next) {
    console.log(2);
    next();
});

(function () {
    var counter = 0;
    arr[0](next);
    function next() {
        counter++;
        if (arr[counter]) {
            arr[counter](next);
        }
    }
})();

//console.log(doSum(1, 2, 3)(4, 5, 6)(10, 10)());
