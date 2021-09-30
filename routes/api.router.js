const express = require("express");
const topicsRouter = require('./topics.router');
const articlesRouter = require('./articles.router');
const commentsRouter = require('./comments.router');
const usersRouter = require("./users.router");
const { getEndPoints } = require('../controllers/api.controller');


const apiRouter = express.Router();

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter)
apiRouter.use('/', getEndPoints);


module.exports = apiRouter;