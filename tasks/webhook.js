const fetch = require('node-fetch-commonjs');
const { robot } = require('./config');

function webhook(data) {
  return new Promise((resolve, reject) => {
    fetch(robot, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((res) => {
        const { errcode } = res;
        if (errcode === 0) {
          resolve();
        } else {
          reject(res.errmsg);
        }
      })
      .catch((e) => {
        console.log(e);
        reject();
      });
  });
}
module.exports.webhook = webhook;
