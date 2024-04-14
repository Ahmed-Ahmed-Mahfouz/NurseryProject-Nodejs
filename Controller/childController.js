const Schema = require('../Model/child');
exports.getAllChildren = (req, res, next) => {
  Schema.find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.addChild = (req, res, next) => {
  const newChild = new Schema(req.body);

  Schema.findOne({ _id: newChild._id })
    .then((existingChild) => {
      if (existingChild) {
        return res.status(400).json({ message: 'Child already exists' });
      }

      return newChild.save();
    })
    .then((data) => {
      res.status(200).json({ data: 'add child' });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getChild = (req, res, next) => {
  const childId = { _id: req.params.id };
  Schema.findOne(childId)
    .then((child) => {
      if (!child) {
        return res.status(404).json({ message: 'Child not found' });
      }
      res.status(200).json({ data: child });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateChild = (req, res, next) => {
  const childId = { _id: req.params.id };
  const updatedData = req.body;

  Schema.findOne(childId)
    .then((child) => {
      if (!child) {
        return res.status(404).json({ message: 'Child not found' });
      }

      return Schema.findOneAndUpdate(childId, updatedData, { new: true });
    })
    .then((child) => {
      res.status(200).json({ data: child });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteChild = (req, res, next) => {
  const childId = { _id: req.params.id };
  Schema.findByIdAndDelete(childId)
    .then((child) => {
      if (!child) {
        return res.status(404).json({ message: 'Child not found' });
      }
      res.status(200).json({ message: 'Child deleted successfully' });
    })
    .catch((err) => {
      next(err);
    });
};
