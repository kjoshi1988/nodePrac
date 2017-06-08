"use strict";
class LinkedList {
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    static convertToList(arr) {
        let prev = new DLL(arr[0]);
        let root = prev;
        for (let i = 1; i < arr.length; i++) {
            let curr = new LinkedList(arr[i]);
            prev.next = curr;
            prev = curr;
        }
        return root;
    }
}
module.exports = LinkedList;