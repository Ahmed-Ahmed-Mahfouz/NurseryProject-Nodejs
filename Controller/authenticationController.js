const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Teacher = require('../Model/teacher');

exports.login = (req, res, next) => {
  Teacher.findOne({ email: req.body.email })
    .then((teacher) => {
      if (!teacher) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      return bcrypt
        .compare(req.body.password, teacher.password)
        .then((doMatch) => {
          if (doMatch) {
            let token = '';
            if (req.body.email == 'Ahmed@gmail.com') {
              token = jwt.sign(
                {
                  id: Teacher._id,
                  name: Teacher.fullname,
                  email: Teacher.email,
                  role: 'admin',
                },
                'pd44',
                {
                  expiresIn: '1h',
                }
              );
            } else {
              token = jwt.sign(
                {
                  id: Teacher._id,
                  name: Teacher.fullname,
                  email: Teacher.email,
                  role: 'user',
                },
                'pd44',
                {
                  expiresIn: '1h',
                }
              );
            }
            res.status(200).json({ data: 'Authenticated', token: token });
          } else {
            return res.status(401).json({ message: 'Authentication failed' });
          }
        });
    })
    .catch((err) => next(err));
};
