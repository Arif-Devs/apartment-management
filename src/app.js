const express = require('express');
const applyMiddleware = require('./middleware/index');
const routes = require('./routes/index');

//express app
const app = express();
applyMiddleware(app);
app.use(routes);

//health route
app.get('/health', (_req, res) => {
  res.status(200).json({
    health: 'OK',
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;
