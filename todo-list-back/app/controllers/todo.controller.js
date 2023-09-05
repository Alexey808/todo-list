const db = require('../models');
const TodoDB = db.todo_list;


exports.getAll = (req, res) => {
  // Контроллер
  const emptyFilter = {};
  const excludedProperty = { _id: 0 };
  const sortByDecreaseDate = { date: -1 };

  TodoDB.find(emptyFilter, excludedProperty).sort(sortByDecreaseDate).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({ success: false, message: err.message || 'Something went wrong.' });
  });
};

exports.add = (req, res) => {
  const newTodo = req.body.data;

  // Валидация
  if (!newTodo.id) {
    return res.status(400).send({ success: false, message: 'Id can not be empty.' });
  }
  if (!newTodo.date) {
    return res.status(400).send({ success: false, message: 'Data can not be empty.' });
  }

  // Контроллер
  TodoDB.insertMany(newTodo).then((r) => {
    res.send({ success: true });
  }).catch((err) => {
    res.status(500).send({ success: false, message: err.message || 'Something went wrong.' });
  })
};

exports.update = (req, res) => {
  const updatedTodo = req.body.data;

  // Валидация
  if (!updatedTodo) {
    return res.status(400).send({ success: false, message: 'Data can not be empty.' });
  }

  // Контроллер
  const filter = { id: updatedTodo.id };
  const update = { $set: updatedTodo };

  TodoDB.updateOne(filter, update).then((data) => {
    if (!data) {
      res.status(404).send({ success: false, message: `Cannot update todo with id=${updatedTodo.id}. Todo was not found.` });
    } else {
      res.send({ success: true });
    }
  }).catch((err) => {
    res.status(500).send({ success: false, message: err.message || 'Something went wrong.' });
  });
};

exports.delete = (req, res) => {
  const todoId = req.query.todoId;

  // Контроллер
  const filter = { id: todoId };

  TodoDB.deleteOne(filter).then((data) => {
    if (!data) {
      res.status(404).send({ success: false, message: 'Cannot delete todo with id=${id}. Todo was not found.'})
    } else {
      res.send({ success: true });
    }
  }).catch((err) => {
    res.status(500).send({ success: false, message: err.message || 'Something went wrong.' });
  })
};
