import "./style.css";
import projectFactory from "./modules/projectFactory";
import todoTaskFactory from "./modules/todoTaskFactory";

const createTask = todoTaskFactory;
const createProject = projectFactory;

const task = createTask(1, "Hei", "Maailma", "24.5.2022", 0, false);
const task2 = createTask(2, "Hei", "Maailma", "24.5.2022", 0, false);
const task3 = createTask(3, "Hei", "Maailma", "24.5.2022", 0, false);
const task4 = createTask(4, "Hei", "Maailma", "24.5.2022", 0, false);
const project = createProject("Jiit", 2);

project.addTodo(task);
project.addTodo(task2);
project.addTodo(task3);
project.addTodo(task4);

project.toggleTodoStatus(2);
project.deleteTodo(3);
project.toggleTodoStatus(4);

console.log(project.getName(), project.getTodos());

const message: string = "Hei Maailma! Ja Äiti";
console.log(message);

const title: HTMLHeadingElement = document.createElement("h1");
title.classList.add("hello");
title.innerText = "Hei Maailma";

document.getElementById("root").appendChild(title);
