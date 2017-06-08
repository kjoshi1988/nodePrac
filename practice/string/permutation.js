function permutation(str, start, end) {
    if (start === undefined && end === undefined) {
        start = 0;
        end = str.length;
    }
    if (start === end) {
        return console.log(str);
    }

    for (var i = start; i < end; i++) {
        permutation(swap(str, i, start), start + 1, end);
    }
}

function swap(str, i, j) {
    str = str.split("");
    var tmp = str[j];
    str[j] = str[i];
    str[i] = tmp;
    return str.join("");
}

permutation("abcd");