function printMaxOnRight(arr, index) {
    index = index || 0;
    var current = arr[index], max; //1,2,3,5,4
    if (index < arr.length) {
        max = printMaxOnRight(arr, index + 1);
    }
    if(max && max > current) {
        console.log("%s - %s", current, max);
        return max;
    }
    return current;
}

printMaxOnRight([4,2,3,8,0, 9 ,11,10]);