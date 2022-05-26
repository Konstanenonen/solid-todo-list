import { TodoTask } from "../../interfaces";

const todoTaskView = (() => {
  const root = document.getElementById("main");

  const createAddButton = () => {
    const addButton = document.createElement("button");
    addButton.classList.add("add-task-button");
    addButton.innerText = "Add a task";

    return addButton;
  };

  const createElements = (todoArray: TodoTask[]) => {
    const elements = todoArray.map((task) => {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-task");

      const title = document.createElement("h2");
      title.classList.add("todo-title");
      title.innerText = task.title;

      const description = document.createElement("p");
      description.classList.add("todo-text");
      description.innerText = task.description;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-task");
      deleteButton.innerText = "X";

      const elementArray = [title, description, deleteButton];

      elementArray.forEach((element) => {
        todoDiv.appendChild(element);
      });

      return todoDiv;
    });

    return elements;
  };

  const render = (todoArray: TodoTask[]) => {
    root.innerHTML = "";
    const elements = createElements(todoArray);
    elements.forEach((element) => {
      root.appendChild(element);
    });
    const addButton = createAddButton();
    root.appendChild(addButton);
  };

  return {
    render,
  };
})();

export default todoTaskView;
