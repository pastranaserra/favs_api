const { sign, verify } = require('jsonwebtoken');

const {
  token: { secret, expires },
} = require('./config');

const signToken = (payload, expiresIn = expires) => {
  return sign(payload, secret, {
    //data send through the client vs the secret word with the config
    expiresIn,
  });
};

const isAuthenticated = async (req, res, next) => {
  let { headers: { authorization: token = '' } = {} } = req;

  if (token.startsWith('Bearer')) {
    token = token.substring(7);
  }

  if (!token) {
    return next({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  verify(token, secret, function (err, decoded) {
    //verify only accepts callback, not await
    if (err) {
      next({
        message: 'Unauthorized',
        statusCode: 401,
      });
    } else {
      req.decoded = decoded; //monkey patch
      next();
    }
  });
};

module.exports = { signToken, isAuthenticated };
