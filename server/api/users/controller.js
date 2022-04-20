const { Model } = require('./model');

exports.signin = async (req, res, next) => {
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
        message: 'You are not authorized',
      });
    }
    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const model = new Model(body);
    const doc = await model.save();

    res.json({
      statusCode: 201,
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { userId } = params;

  try {
    const doc = await Model.findById(userId);

    if (!doc) {
      next({
        statusCode: 404,
        message: 'User not found',
      });
    } else {
      req.doc = doc;
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { doc = {} } = req;

  try {
    const deleted = await doc.remove();
    res.json({
      data: deleted,
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res) => {
  const { doc = {}, body = {} } = req;

  Object.assign(doc, body);

  try {
    const updatedDoc = await doc.save();
    res.json({
      data: updatedDoc,
    });
  } catch (err) {
    next(err);
  }
};
