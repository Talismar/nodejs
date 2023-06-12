const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(404).json({ error: "Users not found!" });
  }

  request.user = user;

  next();
}

app.get("/users", (request, response) => {
  return response.json(users);
});

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  if (users.some((user) => user.username === username)) {
    return response.status(400).json({
      error: "User already exists!",
    });
  }

  const id = uuidv4();
  const newUser = {
    id,
    name,
    username,
    created_at: new Date(),
    todos: [],
  };

  users.push(newUser);

  return response.status(201).json(newUser);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { deadline, title } = request.body;

  if (!(deadline && title)) {
    return response.status(400).json({ error: "Send deadline and title." });
  }

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const { deadline, title } = request.body;

  const todo = user.todos.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "Message Error!" });
  }

  if (!(title && deadline)) {
    return response.status(400).json({ error: "Message Error!" });
  }

  todo["title"] = title;
  todo["deadline"] = deadline;

  return response.json(todo);
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const todo = user.todos.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "Message Error!" });
  }

  todo["done"] = true;

  return response.json(todo);
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const todo = user.todos.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "Message Delete" });
  }

  const todoDeleted = user.todos.filter((todo) => todo.id !== id);

  user.todos = todoDeleted;

  return response.status(204).send();
});

module.exports = app;
