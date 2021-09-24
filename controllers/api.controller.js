const db = require("../db/connection");
const { fetchEndPoints } = require('../models/api.model')

exports.getEndPoints = async (req, res, next) => {
    try {
        const endPoints = await fetchEndPoints();
        res.status(200).send(endPoints);
        
    
    } catch (err) {
        next(err);
}

    
}
