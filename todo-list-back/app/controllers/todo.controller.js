const localDB = {
  todoList: [],
};

function writeData(todo) {
  return new Promise((resolve, reject) => {
    try {
      const index = localDB.todoList.findIndex((todoItem) => todoItem.id === todo.id);
      localDB.todoList[index]
        ? localDB.todoList[index] = todo
        : localDB.todoList.push(todo);
      resolve();
    } catch(error) {
      reject(error);
    }
  });
}

function deleteData(todoId) {
  return new Promise((resolve, reject) => {
    try {
      localDB.todoList = localDB.todoList.filter((todo) => {
        return String(todo.id) !== String(todoId);
      });
      resolve();
    } catch(error) {
      reject(error);
    }
  });
}

function getData() {
  return new Promise((resolve, reject) => {
    try {
      resolve(localDB.todoList);
    } catch(error) {
      reject(error);
    }
  });
}

// api/todo/todo-list
exports.getAll = (req, res) => {
  getData().then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(500).send({ success: false, message: err.message || 'Something went wrong.' });
  })
};

// api/todo/add
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
  writeData(newTodo).then(() => {
    res.send({ success: true });
  }).catch((err) => {
    res.status(500).send({ success: false, message: err.message || 'Something went wrong.' });
  })
};

// api/todo/update
exports.update = (req, res) => {
  const updatedTodo = req.body.data;

  // Валидация
  if (!updatedTodo) {
    return res.status(400).send({ success: false, message: 'Data can not be empty.' });
  }

  // Контроллер
  writeData(updatedTodo).then(() => {
    res.send({ success: true });
  }).catch((err) => {
    res.status(500).send({ success: false, message: err.message || 'Something went wrong.' });
  });
};

// api/todo/delete
exports.delete = (req, res) => {
  const todoId = req.query.todoId;

  // Контроллер
  deleteData(todoId).then(() => {
    res.send({ success: true });
  }).catch((err) => {
    res.status(500).send({ success: false, message: err.message || 'Something went wrong.' });
  });
};
