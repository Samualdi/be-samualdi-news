
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

formatArticlesData = (articlesData) => {
    if (articlesData.length === 0) return [];
    const formattedArticles = articlesData.map(article => {
        return [article.title, article.topic, article.author, article.body, article.created_at, article.votes];
    })
    return formattedArticles;
}



module.exports = { formatTopicsData, formatUsersData, formatArticlesData};
