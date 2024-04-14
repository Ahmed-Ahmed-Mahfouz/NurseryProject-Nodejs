const express = require('express');
const mongoose = require('mongoose');
const teacherRouter = require('./Route/teacherRoute');
const childRouter = require('./Route/childRoute');
const classRouter = require('./Route/classRoute');
const loginRouter = require('./Route/authenticationRoute');
const authMW = require('./MW/Auth/authenticationMW');

const server = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/NurserySystem')
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(8080, () => {
      console.log(`I am listening...`);
    });
  })
  .catch((err) => {
    console.log(err + ' DB problem..');
  });

server.use((req, res, next) => {
  console.log(req.url, req.method);

  next();
});
server.use(express.json());

server.use(loginRouter);

server.use(authMW);

server.use(teacherRouter);
server.use(childRouter);
server.use(classRouter);

//2- General MW
server.use((req, res) => {
  res.status(404).json({ data: 'Not Found' });
});

//3- Error MW
server.use((error, req, res, next) => {
  res.status(error.status || 500).json({ data: 'error : ' + error });
});
