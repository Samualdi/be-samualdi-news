const express = require("express");
const db = require('./db/connection');
const apiRouter = require('./routes/api.router');
const { handle500Errors, handle400Errors, handleCustomErrors } = require('./errors/error.handlers');


const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use(handle400Errors);
app.use(handleCustomErrors);

app.use(handle500Errors);

module.exports = app;