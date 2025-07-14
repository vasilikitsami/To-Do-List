const getTodos = (req, res) => {
    let todos = [
    { id: '1', task: 'Buy groceries', completed: false },
    { id: '2', task: 'Walk the dog', completed: true },
];

    return res.status(200).json(todos);
};

const addTodo = (req, res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    return res.status(200).json(newTodo);
}

const updateTodo = (req, res) => {
    const {id} = req.params;
    const updatedTodo = req.body;
    todos = todos.map (todo => (todo.id === id ? {...todo, ...updatedTodo} : todo));
    return res.status(200).json(updatedTodo);
}

const deleteTodo = (req, res) => {
    const {id} = req.params;
    todos = todos.filter(todo => todo.id !== id);
    return res.status(204).send();
}

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
};
