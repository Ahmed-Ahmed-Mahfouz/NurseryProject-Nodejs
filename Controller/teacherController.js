const Schema = require('../Model/teacher');
const Class = require('../Model/class');
exports.getAllTeachers = (req, res, next) => {
  Schema.find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.addTeacher = (req, res, next) => {
  const newTeacher = new Schema(req.body);

  Schema.findOne({ _id: newTeacher.id })
    .then((existingTeacher) => {
      if (existingTeacher) {
        return res.status(400).json({ message: 'Teacher already exists' });
      }

      return newTeacher.save();
    })
    .then((data) => {
      res.status(200).json({ data: 'add teacher' });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getTeacher = (req, res, next) => {
  const teacherId = { _id: req.params.id };
  Schema.findOne(teacherId)
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json({ data: teacher });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateTeacher = (req, res, next) => {
  const teacherId = { _id: req.params.id };
  const updatedData = req.body;

  Schema.findOne(teacherId)
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      return Schema.findOneAndUpdate(teacherId, updatedData, { new: true });
    })
    .then((teacher) => {
      res.status(200).json({ data: teacher });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteTeacher = (req, res, next) => {
  const teacherId = { _id: req.params.id };
  Schema.findByIdAndDelete(teacherId)
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json({ message: 'Teacher deleted successfully' });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getAllSupervisors = (req, res, next) => {
  try {
    Class.find()
      .populate({ path: 'supervisor' })
      .select('supervisor')
      .then((data) => {
        const supervisors = data.map((item) => item.supervisor);
        const uniqueSupervisors = [...new Set(supervisors)];
        res.status(200).json({ teachers: uniqueSupervisors });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
