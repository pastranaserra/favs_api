const { Model } = require('./model');

const { paginationParams } = require('../../utils');

exports.list = async (req, res, next) => {
  const { query } = req;
  const { limit, page, skip } = paginationParams(query);

  try {
    const data = await Promise.all([
      Model.find({}).skip(skip).limit(limit).exec(),
      Model.countDocuments(),
    ]);

    const [doc, countDocs] = data;

    const pages = Math.ceil(countDocs / limit);

    res.json({
      data: doc,
      meta: {
        page,
        skip,
        limit,
        pages,
      },
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

    res.status(201);
    res.json({
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { listId } = params; // listId named as same as the route /:listId in lists/routes

  try {
    const doc = await Model.findById(listId);

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

exports.modify = async (req, res) => {
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
