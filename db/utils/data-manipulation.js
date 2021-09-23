
formatData = (data) => {
    if (data.length === 0) return []
    const fromattedData = data.map(obj => {
        return Object.values(obj);
    })
    return fromattedData;
    }

module.exports = {formatData};
