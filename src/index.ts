import "./style.css";
import projectFactory from "./modules/projectFactory";
import todoTaskFactory from "./modules/todoTaskFactory";
import projectContainer from "./modules/projectContainer";
import projectView from "./modules/projectView";
import todoTaskView from "./modules/todoTaskView";

const createTask = todoTaskFactory;
const createProject = projectFactory;

const task = createTask(1, "first", "Maailma", "24.5.2022", 0, false);
const task2 = createTask(2, "first2", "Maailma", "24.5.2022", 0, false);
const task3 = createTask(3, "first3", "Maailma", "24.5.2022", 0, false);
const task4 = createTask(4, "second", "Maailma", "24.5.2022", 0, false);
const project = createProject("first", 2);
const project2 = createProject("second", 3);
const project3 = createProject("third", 4);

project.addTodo(task);
project.addTodo(task2);
project.addTodo(task3);
project2.addTodo(task4);

projectContainer.addProject(project);
projectContainer.addProject(project2);
projectContainer.addProject(project3);

projectView.render(projectContainer.otherProjects);
todoTaskView.render(projectContainer.otherProjects[0].getTodos());

console.log(projectContainer);
console.log(projectContainer.otherProjects[0].getTodos());
