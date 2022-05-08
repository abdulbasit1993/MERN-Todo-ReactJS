const ToDoModel = require("../models/ToDoModel");

module.exports.getToDo = async (req, res) => {
  const Todo = await ToDoModel.find();
  res.send(Todo);
};

module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;
  await ToDoModel.create({ text })
    .then(() => res.status(201).send("Added Successfully..."))
    .catch((err) => console.log(err));
};

module.exports.deleteToDo = (req, res) => {
  const { _id } = req.body;

  ToDoModel.findByIdAndDelete(_id)
    .then(() => res.status(201).send("Deleted Successfully..."))

    .catch((err) => console.log(err));
};

module.exports.updateToDo = (req, res) => {
  const { _id, text } = req.body;

  ToDoModel.findByIdAndUpdate(_id, { text })
    .then(() => res.status(201).send("Updated Successfully..."))
    .catch((err) => console.log(err));
};
