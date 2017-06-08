function Node(val) {
    this.val = val;
    this.next = null;
}

var l1 = new Node("l1");
l1.next = new Node("l2");
l1.next.next = new Node("l3");
l1.next.next.next = new Node("l4");
l1.next.next.next.next = new Node("l5");
l1.next.next.next.next.next = new Node("l6");


function reverse(root, count) {
    var counter = 0;
    var currNode = root;
    var next = null;
    var prev = null;
    while (currNode != null && (count === -1 || counter < count)) {
        next = currNode.next;
        currNode.next = prev;
        prev = currNode;
        currNode = next;
        counter++;
    }
    if(currNode != null) {
        root.next = reverse(currNode, count);
    }
    return prev;
}

var reve = reverse(l1, -1);
console.log(reve);