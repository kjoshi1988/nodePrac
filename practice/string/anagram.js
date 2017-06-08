function testAnagrams(str1, str2) {

    if (!str1 || !str2 || str1.length !== str2.length) {
        return false;
    }
    var countMap = {};
    var char, totalCharCount = str1.length;
    for (var len = 0; len < totalCharCount; len++) {
        char = str1.charAt(len);
        countMap[char] = (countMap[char] || 0) + 1;
        char = str2.charAt(len);
        if (countMap[char]) {
            countMap[char] = countMap[char] - 1;
            totalCharCount--;
        }
    }

    //var charCount;
    //for (len = 0; len < str2.length; len++) {
    //    char = str2.charAt(len);
    //    charCount = countMap[char];
    //    if(!charCount) {
    //        return false;
    //    }
    //    countMap[char] = charCount - 1;
    //}
    return totalCharCount === 0;
}

function testAnagrams2(str1, str2) {
    var countMap = {};
    var char, totalCharCount = str1.length;
    for (var len = 0; len < totalCharCount; len++) {
        char = str1.charAt(len);
        countMap[char] = (countMap[char] || 0) + 1;
    }

    var charCount;
    for (len = 0; len < str2.length; len++) {
        char = str2.charAt(len);
        charCount = countMap[char];
        if (!charCount) {
            return false;
        }
        countMap[char] = charCount - 1;
    }
    return true;
}

console.log(testAnagrams2("abbca", "babac"));
console.log(testAnagrams2("abbca", "ababac"));
console.log(testAnagrams2("abcbca", "cbabac"));