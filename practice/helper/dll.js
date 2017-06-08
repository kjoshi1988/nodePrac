"use strict";
class DLL {
    constructor(data) {
        this.data = data;
        this.prev = this.next = null;
    }

    static convertToDll(arr) {
        let prev = new DLL(arr[0]);
        let root = prev;
        for (let i = 1; i < arr.length; i++) {
            let curr = new DLL(arr[i]);
            curr.prev = prev;
            prev.next = curr;
            prev = curr;
        }
        return root;
    }
}
module.exports = DLL;