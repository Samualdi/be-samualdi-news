
formatData = (data) => {
    if (data.length === 0) return []
    const formattedData = data.map(obj => {
        return Object.values(obj);
    })
    return formattedData;
    }

module.exports = {formatData};
