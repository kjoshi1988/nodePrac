"use strict";
const DLL = require("../helper/dll");
const LRU = (function () {
    const hashMap = {};
    let startNode = null;
    return {
        add: function (ele) {
            let queueNode = hashMap[ele];
            if (queueNode) {
                let prev = queueNode.prev;
                if (prev !== null) {
                    let next = queueNode.next;
                    prev.next = next;
                    if (next) {
                        next.prev = prev;
                    }
                    queueNode.prev = null;
                }
            } else {
                queueNode = new DLL(ele);
                hashMap[ele] = queueNode;
            }
            if(startNode) {
                queueNode.next = startNode;
                startNode.prev = queueNode;
            }
            startNode = queueNode;
        },
        getCache: function () {
            return startNode;
        }
    }
})();

LRU.add(1);
LRU.add(2);
LRU.add(3);
LRU.add(4);
LRU.add(1);
console.log(LRU.getCache());