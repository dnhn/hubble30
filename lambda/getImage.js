const db = require('./db');

exports.handler = async event => {
  const { id } = event.queryStringParameters;

  if (id) {
    if (db[id]) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          id: id,
          ...db[id],
        }),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({
        errorMessage: 'INVALID_DATE',
      }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      errorMessage: 'EMPTY_INPUT',
    }),
  };
};
