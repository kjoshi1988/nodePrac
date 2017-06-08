function findSubStringCount(str) {
    var charCount = Object.create(null), char;
    for (var i = 0; i < str.length; i++) {
        char = str.charAt(i);
        charCount[char] = (charCount[char] || 0 ) + 1;
    }

    var totalSubString = 0, count;
    for (var key in charCount) {
        count = charCount[key];
        totalSubString += (count * (count + 1)) / 2;  //C(n+1, 2)
    }
    return totalSubString;
}

console.log(findSubStringCount("abcab"));
console.log(findSubStringCount("aba"));