function findLocalMax(arr, mid) {
    var len = arr.length;
    if (mid === undefined) {
        mid = Math.floor(len / 2);
    }
    if(mid === 0 || mid === (len - 1)) {
        return {ele: arr[mid], index: mid};
    }
    var ele = arr[mid];
    if (ele > arr[mid - 1] && ele > arr[mid + 1]) {
        return {ele: ele, index: mid};
    }
    if (ele > arr[mid - 1]) {
        mid = Math.floor((mid + len) / 2) % len;
    } else {
        mid = Math.floor(mid / 2);
    }
    return findLocalMax(arr, mid);
}

var arr1 = [8, 10, 20, 80, 100, 200, 400, 500, 3, 2, 1];
var arr2 = [1, 3, 50, 10, 9, 7, 6];
var arr3 = [10, 20, 30, 40, 50];
var arr4 = [120, 100, 80, 20, 0];

console.log(findLocalMax(arr1));
console.log(findLocalMax(arr2));
console.log(findLocalMax(arr3));
console.log(findLocalMax(arr4));
