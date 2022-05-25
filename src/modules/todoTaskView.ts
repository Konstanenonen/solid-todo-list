import { TodoTask } from "../../interfaces";

const todoTaskView = (() => {
  const root = document.getElementById("main");

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

      const elementArray = [title, description];

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
  };

  return {
    render,
  };
})();

export default todoTaskView;
