const Schema = require('../Model/class');
exports.getAllClasses = (req, res, next) => {
  Schema.find()
    .populate({ path: 'supervisor', select: { fullname: 1 } })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.addClass = (req, res, next) => {
  const newClass = new Schema(req.body);

  if (!newClass.supervisor) {
    return res.status(400).json({ message: 'Supervisor is required' });
  }

  if (!newClass.children || newClass.children.length === 0) {
    return res.status(400).json({ message: 'At least one child is required' });
  }

  newClass
    .save()
    .then((data) => {
      res.status(200).json({ data: 'Class added successfully' });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateClass = (req, res, next) => {
  const classId = { _id: req.params.id };
  const updatedData = req.body;

  if (updatedData.supervisor === undefined || updatedData.supervisor === null) {
    return res.status(400).json({ message: 'Supervisor is required' });
  }

  if (updatedData.children && updatedData.children.length === 0) {
    return res.status(400).json({ message: 'At least one child is required' });
  }

  Schema.findOneAndUpdate(classId, updatedData, { new: true })
    .then((classes) => {
      if (!classes) {
        return res.status(404).json({ message: 'Class not found' });
      }
      res.status(200).json({ data: classes });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getClass = (req, res, next) => {
  const classId = { _id: req.params.id };
  Schema.findOne(classId)
    .then((classes) => {
      if (!classes) {
        return res.status(404).json({ message: 'Class not found' });
      }
      res.status(200).json({ data: classes });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteClass = (req, res, next) => {
  const classId = { _id: req.params.id };
  Schema.findByIdAndDelete(classId)
    .then((classes) => {
      if (!classes) {
        return res.status(404).json({ message: 'Class not found' });
      }
      res.status(200).json({ message: 'Class deleted successfully' });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getClassChildren = (req, res, next) => {
  Schema.findOne({ _id: req.params.id })
    .populate({ path: 'children', select: { _id: 0 } })
    .then((child) => {
      if (!child) {
        return res.status(404).json({ message: 'Children not found' });
      }
      res.status(200).json({ data: child.children });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getClassSupervisor = (req, res, next) => {
  Schema.findOne({ _id: req.params.id })
    .populate({ path: 'supervisor', select: { _id: 0 } })
    .then((sup) => {
      if (!sup) {
        return res.status(404).json({ message: 'Supervisor not found' });
      }
      res.status(200).json({ data: sup.supervisor });
    })
    .catch((err) => {
      next(err);
    });
};
