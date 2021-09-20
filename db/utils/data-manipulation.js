
formatTopicsData = (topicsData) => {
    if (topicsData.length === 0) return [];
    const formattedTopics = topicsData.map(topic => {
        return [topic.description, topic.slug];
    })
    return formattedTopics;
}

formatUsersData = (usersData) => {
    if (usersData.length === 0) return [];
    const formattedUsers = usersData.map(user => {
        return [user.username, user.name, user.avatar_url];
    })

    return formattedUsers;

}

module.exports = { formatTopicsData, formatUsersData };
