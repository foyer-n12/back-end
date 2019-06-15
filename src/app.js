'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./router');
const errorHandler = require('./middleware/error');
const notFound = require('./middleware/404');


const app = express();
app.use(cors(
  {
    origin: "*",
    credentials: true,

  }
));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(routes);
app.use(notFound);
app.use(errorHandler);

let isRunning = false;

module.exports = {
  server: app,
  start: (port) => {
    if (!isRunning) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`server Up on ${port}`);
      });
    } else {
      console.log('Server is already running');
    }
  },
};
