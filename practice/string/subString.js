function frequent(s, k, l, m) {
    var map = {}, subStr;
    var max = s.length - k + 1;
    var maxFreq = 1, current;
    for (var i = 0; i < max; i++) {
        for (var j = k; j <= l; j++) {
            if((j + i) > s.length) {
                break;
            }
            subStr = s.substring(i, j + i);
            if (subStr && findUniqueCharacter(subStr) <= m) {
                current = (map[subStr] || 0) + 1;
                map[subStr] = current;
                if(!maxFreq || (maxFreq < current)) {
                    maxFreq = current;
                }
            }
        }
    }
    return maxFreq;
}


function findUniqueCharacter(str) {
    var map = {}, count = 0, char;
    for (var i = 0; i < str.length; i++) {
        char = str.charAt(i);
        if (!map[char]) {
            map[char] = 1;
            count++;
        }
    }
    return count;
}

console.log("max:",frequent("ababab", 2, 3, 4));