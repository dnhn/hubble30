const db = require('./db');

exports.handler = (event, _, callback) => {
  const { id } = event.queryStringParameters;

  if (id) {
    if (db[id]) {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(db[id]),
      });
    }

    callback(`id '${id}' does not exist.`);
  }

  callback(`id '${id}' does not exist.`);
};
