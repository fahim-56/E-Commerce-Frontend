var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];
for (var i = 0; i < friends.length; i++) {
    if (friends[i].length > 0) {
        longestName = friends[i];
    }
}

console.log(longestName);