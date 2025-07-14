const express = require('express');
const toDoRoutes = require('./routes/toDoRoutes');
const userRoutes = require('./routes/userRoutes');

const cors = require('cors');

const app = express();
const PORT = 4001;

app.use(express.json());

app.use(cors({ origin: '*' }));

app.use('/api/todos', toDoRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

