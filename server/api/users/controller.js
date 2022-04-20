const { Model } = require('./model');

exports.list = async (req, res, next) => {
  try {
    const doc = await Model.find({}).exec();
    res.json({
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
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
