const express = require('express');
const path = require('path');

const app = express();

/* Подключение БД */
require('./app/db_connection');

/* Парсинг запросов content-type - application/json */
app.use(express.json());

/* Подключение build сборки фронта */
app.use(express.static(__dirname + '/public/front'));

/* Настройка обработчика запросов */
app.get('*', (req, res, next) => {
  // если это не api, маршрутизируем фронт, иначе продолжаем выполнение
  if (!req.path.includes('/api')) {
    res.sendFile(path.join(__dirname, '/public/front', 'index.html'));
  } else {
    next();
  }
});

/* API */
require('./app/routes/todo.routes')(app);

/* Запуск сервера */
require('dotenv').config();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
