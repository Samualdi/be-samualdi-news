
formatTopicsData = (topicsData) => {
    if (topicsData.length === 0) return [];
    const formattedTopics = topicsData.map(topic => {
        return [topic.description, topic.slug];
    })
    return formattedTopics;
}

module.exports = formatTopicsData;
