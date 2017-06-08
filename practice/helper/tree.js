"use strict";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    //[10, 20, 30 ,40, 1, 2, 3, 4]
    static buildTree(arr) {
        const root = new Node(arr[0]);
        root.left = createSubTree(arr, 1);
        root.right = createSubTree(arr, 2);
        return root;
    }
}

function createSubTree(arr, index) {
    if (arr[index]) {
        let node = new Node(arr[index]);
        node.left = createSubTree(arr, 2 * index + 1);
        node.right = createSubTree(arr, 2 * index + 2);
        return node;
    }
    return null;
}

/**
 *          10
 *         /  \
 *       20    30
 *      /  \  /  \
 *    40   1 2   3
 *   /
 *  4
 */
//let tree = Node.buildTree([10, 20, 30, 40, 1, 2, 3, 4]);

module.exports = Node;