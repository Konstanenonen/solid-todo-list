import { TodoTask } from "../../interfaces";

const todoTaskView = (() => {
  const root = document.getElementById("main");

  const createAddButton = () => {
    const addButton = document.createElement("button");
    addButton.classList.add("add-task-button");
    addButton.innerText = "Add a task";

    return addButton;
  };

  const createAddField = () => {
    const addField = document.createElement("input");
    addField.type = "text";
    addField.classList.add("task-field");

    return addField;
  };

  const createElements = (todoArray: TodoTask[]) => {
    const elements = todoArray.map((task) => {
      const todoDiv = document.createElement("div");
      todoDiv.id = task.id;
      todoDiv.classList.add("todo-task");

      const title = document.createElement("h3");
      title.classList.add("todo-title");
      title.innerText = task.title;

      const expandButton = document.createElement("button");
      expandButton.classList.add("expand-task");
      expandButton.innerText = "Expand";

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-task");
      deleteButton.innerText = "X";

      const elementArray = [title, expandButton, deleteButton];

      elementArray.forEach((element) => {
        todoDiv.appendChild(element);
      });

      return todoDiv;
    });

    return elements;
  };

  const expandTask = (todoTask: TodoTask) => {
    const todoElement = document.getElementById(todoTask.id);
    todoElement.classList.remove("todo-task");
    todoElement.classList.add("todo-task-expanded");
    todoElement.innerHTML = "";

    const title = document.createElement("h3");
    title.classList.add("todo-title");
    title.innerText = `Title: ${todoTask.title}`;

    const description = document.createElement("p");
    description.classList.add("todo-description");
    description.innerText = `Description: ${todoTask.description}`;

    const dueDate = document.createElement("p");
    dueDate.classList.add("todo-date");
    dueDate.innerText = `Due date: ${todoTask.dueDate}`;

    const priority = document.createElement("p");
    priority.classList.add("todo-priority");
    priority.innerText = `Priority: ${todoTask.priority}`;

    const status = document.createElement("p");
    status.classList.add("todo-status");
    status.innerText = `Status: ${todoTask.completed}`;

    const minimize = document.createElement("button");
    minimize.classList.add("minimize-button");
    minimize.innerText = "Minimize";

    const elementArray = [
      title,
      description,
      dueDate,
      priority,
      status,
      minimize,
    ];
    elementArray.forEach((element) => {
      todoElement.appendChild(element);
    });
  };

  const render = (todoArray: TodoTask[]) => {
    root.innerHTML = "";
    const elements = createElements(todoArray);
    elements.forEach((element) => {
      root.appendChild(element);
    });
    const addButton = createAddButton();
    const addField = createAddField();
    root.appendChild(addField);
    root.appendChild(addButton);
  };

  return {
    expandTask,
    render,
  };
})();

export default todoTaskView;
