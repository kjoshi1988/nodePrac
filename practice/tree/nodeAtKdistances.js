"use strict";

const Tree = require("../helper/tree");

/**
 *          10
 *         /  \
 *       20    30
 *      /  \  /  \
 *    40   1 2   3
 *   /
 *  4
 */
const rootNode = Tree.buildTree([10, 20, 30, 40, 1, 2, 3, 4]);


function findNodes(node, data, distance) {
    var nodesAtK = [];
    var counter = {count: distance};
    findDataNode(node, data, distance, nodesAtK, counter);
    return nodesAtK;
}

function findDataNode(node, data, dist, nodesAtK, counter) {
    if (node.data === data) {
        counter.count--;
        findKthNodes(node, dist, nodesAtK);
        return node;
    }
    var dataNode;
    if (node.left) {
        dataNode = findDataNode(node.left, data, dist, nodesAtK, counter);
    }
    if (dataNode) {
        findkthNodeFromParent(node, node.right, counter, nodesAtK);
    } else {
        if (node.right) {
            dataNode = findDataNode(node.right, data, dist, nodesAtK, counter);
        }
        if (dataNode) {
            findkthNodeFromParent(node, node.left, counter, nodesAtK);
        }
    }
    return dataNode;
}

function findkthNodeFromParent(node, nextNode, counter, nodesAtK) {
    if(counter.count < 0) {
        return;
    }
    if(counter.count === 0) {
        counter.count--;
        return nodesAtK.push(node);
    }
    counter.count--;
    findKthNodes(nextNode, counter.count, nodesAtK);
}

function findKthNodes(node, dist, nodesAtK) {
    if (!node) {
        return;
    }
    if (dist === 0) {
        return nodesAtK.push(node);
    }
    if (node.left) {
        findKthNodes(node.left, dist - 1, nodesAtK);
    }
    if (node.right) {
        findKthNodes(node.right, dist - 1, nodesAtK);
    }
}

console.log(findNodes(rootNode, 10, 0));