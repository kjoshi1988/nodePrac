function reverse(str1, count) {
    if (count === str1.length) {
        return;
    }
    count = count || 0;
    return (reverse(str1, count + 1) || "") + str1.charAt(count);
}

console.log(reverse("ABCDEF"));
console.log(reverse("AADDSSFF"));