module.exports = app => {
  const todo = require('../controllers/todo.controller.js');
  const router = require('express').Router();

  router.get('/getAll', todo.getAll);
  router.put('/update', todo.update);
  router.post('/add', todo.add);
  router.delete('/delete?:todoId', todo.delete);

  app.use('/api/todo', router);
}
