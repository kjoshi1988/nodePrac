function checkIfPalindrome(str) {
    var strLen = str.length;
    var isEvenStr = strLen % 2 === 0;
    var freqCount = Object.create(null), char;
    for (var i = 0; i < strLen; i++) {
        char = str.charAt(i);
        freqCount[char] = (freqCount[char] || 0) + 1;
    }

    var freq, oddCount = 0;
    for (var keyChar in freqCount) {
        freq = freqCount[keyChar];
        if (freq % 2 !== 0) {
            if (isEvenStr) {
                return false;
            }
            oddCount++;
        }
        if (oddCount > 1) {
            return false;
        }
    }
    return (oddCount === 1);
}

console.log(checkIfPalindrome("malayalam"));
console.log(checkIfPalindrome("apple"));