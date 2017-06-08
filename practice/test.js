(function find(){
    var noFollow = [];
    $("a").each(function (index, ele) {
        if (ele) {
            var rel = ele.getAttribute("rel");
            if (ele.href.indexOf("click/") !== -1 && (!rel || rel.indexOf("nofollow") === -1)) {
                noFollow.push(ele);
            }
        }
    });
    return noFollow;
})();

String.prototype.repeat = function (n) {
    if (n == 1) {
        return this;
    }
    var cached = arguments[1] || {};
    if (cached[n]) {
        return cached[n];
    }
    var index = Math.floor(n / 2);
    var val = this.repeat(index, cached) + this.repeat(n - index, cached);
    cached[n] = val;
    return val;
};
String.prototype.repeatWithLoop = function (n) {
    var ret = "";
    while (n > 0) {
        ret += this;
        n--;
    }
    return ret;
};



console.time("repeat");
"hello".repeat(1000000);
console.timeEnd("repeat");

console.time("repeat_loop");
"hello".repeatWithLoop(1000000);
console.timeEnd("repeat_loop");