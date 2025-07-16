import Todo from '../models/Todo.js';

export const getTodos = async (req, res) => {

    const todos = await Todo.find();
    return res.status(200).json(todos);
};

export const addTodo = async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json(newTodo);
}

export const updateTodo = async (req, res) => {
    const {id} = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTodo);
}

export const deleteTodo = async (req, res) => {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
}

