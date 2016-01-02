var Promise = require('bluebird');
var sa = require('superagent');

function agent(action, url) {
    return new Promise( (resolve, reject) => {
        sa(action, url).end( (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
            return null;
        })
    })
}

module.exports = agent
