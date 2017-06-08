"use strict";

const TreeNode = require("../helper/tree");

const expression = ["a", "*", "b", "+", "c"];

function buildTree() {
    const stack = [];
    let lastOp;
    for (let i = 0; i < expression.length; i++) {
        let curr = expression[i];
        let node = new TreeNode(curr);
        let prev;
        if (isOperand(curr) && stack.length > 0) {
            node.right = stack.pop();
            node.left = stack.pop();
            lastOp = node;
        }
        stack.push(node);
    }
    console.log(0);
}

function isOperand(o) {
    switch (o) {
        case "+":
        case "-":
        case "*":
        case "%":
            return true;
    }
    return false;
}

buildTree();