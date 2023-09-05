module.exports = mongoose => {
  // Создание схемы
  const todoSchema = mongoose.Schema({
    id: String,
    title: String,
    date: Number,
    done: Boolean
  }, {
    timestamps: false,
    versionKey: false,
  });

  const collectionName = 'todo'; // в БД полное наименование коллекции: todos

  return mongoose.model(collectionName, todoSchema);
}
