const db = require("../db/connection");
const fsPromise = require('fs/promises');


exports.fetchEndPoints = () => {
    return fsPromise.readFile(`${__dirname}/../endpoints.json`, `utf-8`).then((result) => {
      return JSON.parse(result);
    });

    
}
