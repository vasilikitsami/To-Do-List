import Todo from '../models/Todo';

const getTodos = async (req, res) => {

    const todos = await Todo.find();
    return res.status(200).json(todos);
};

const addTodo = async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json(newTodo);
}

const updateTodo = async (req, res) => {
    const {id} = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTodo);
}

const deleteTodo = async (req, res) => {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
}

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
};
