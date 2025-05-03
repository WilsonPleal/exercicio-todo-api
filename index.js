//todo: {id: numer, title, string, completed: boolean}
const { request } = require("http");
const db = require("./database")
const express = require("express");
const { title } = require("process");
const server = express();
server.use(express.json());

server.get("/", (_request, response) => {
    response.status(200).json({ message: "Olá mundo!" });
})

server.get("/tasks", async (_request, response) => {
   const tasks = await db.list();
   response.status(200).json(tasks);
})

server .get("/tasks/:id", async(request, response) =>{
    const id = request.params.id;

    const task = await db.get(id);

    response.status(200).json(task);
})

server.post("/tasks" , async (request, response) => {
    const newTasks = request.body;
    const tasksCreated = await db.insert(newTasks);

    response.status(201).json(tasksCreated);
})

server.put("/tasks/:id" , async(request, response) => {
    const id = request.params.id;
    const newUpdateTitle = request.body;
    const oldtask = await db.get(id);
    oldtask.title = newUpdateTitle.title


    const newTaskstask = await db.update(oldtask);

    response.status(200).json(newTaskstask)
})

server.listen("3001", () => console.log("Server esta rodando!"));

//atualizar o titulo de uma tarefa PUT: http://localhost:3001/tasks/:id

// mudar o valor de completed  PUT: http://localhost:3001/tasks/:id/completed

// excluir uma tarefa:  DELETE PUT: http://localhost:3001/tasks/:id