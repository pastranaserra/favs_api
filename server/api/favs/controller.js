const { Model } = require('./model');
const referencesNames = [...Object.getOwnPropertyNames(references)];

exports.list = async (req, res, next) => {
  const populate = Object.populateToObject(referencesNames);
  try {
    const doc = await Model.find({}).populate(populate).exec();
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
  const { Id } = params; // Id named as same as the route /:Id in /routes

  try {
    const doc = await Model.findById(Id);

    if (!doc) {
      next({
        statusCode: 404,
        message: 'List not found',
      });
    } else {
      req.doc = doc;
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    data: doc,
  });
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
