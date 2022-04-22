const { Model } = require('../api/users/model');
const { signToken } = require('../auth');

exports.login = async (req, res, next) => {
  const { body = {} } = req;
  const { email = '', password = '' } = body;

  try {
    const user = await Model.findOne({ email: email }).exec();
    if (!user) {
      return next({
        statusCode: 401,
        message: 'You are not authorized',
      });
    }
    const verified = await user.verifyPassword(password);
    if (!verified) {
      return next({
        statusCode: 401,
        message: 'Wrong password',
      });
    }

    const { _id: id } = user;
    const token = signToken({ id });

    res.json({
      data: user,
      meta: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
