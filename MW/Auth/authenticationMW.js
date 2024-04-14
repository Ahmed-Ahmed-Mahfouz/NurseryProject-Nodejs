const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    let token = req.get('authorization').split(' ')[1];
    let decodedToken = jwt.verify(token, 'pd44');
    req.token = decodedToken;
    next();
  } catch (error) {
    error.message = 'Not Authenticated';
    error.status = 401;
    next(error);
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.token.role == 'admin') next();
  else {
    let error = new Error('Not Authorized');
    error.status = 403;
    next(error);
  }
};

module.exports.isUser = (req, res, next) => {
  if (req.token.role == 'user') next();
  else {
    let error = new Error('Not Authorized');
    error.status = 403;
    next(error);
  }
};

module.exports.isAdminUser = (req, res, next) => {
  if (req.token.role == 'admin' || req.token.role == 'user') next();
  else {
    let error = new Error('Not Authorized');
    error.status = 403;
    next(error);
  }
};
