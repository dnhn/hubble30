const db = require('./db');

exports.handler = async (event, context) => {
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
        errorMessage: 'Invalid input.',
      }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      errorMessage: 'Empty input.',
    }),
  };
};
