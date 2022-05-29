import { TodoTask } from "../../interfaces";

const todoTaskView = (() => {
  const root = document.getElementById("main");

  const createAddButton = () => {
    const addButton = document.createElement("button");
    addButton.classList.add("add-task-button");
    addButton.innerText = "Add a task";

    return addButton;
  };

  const createAddForm = () => {
    const titleLabel = document.createElement("label");
    titleLabel.htmlFor = "task-title-field";
    titleLabel.innerText = "Title:";

    const titleField = document.createElement("input");
    titleField.type = "text";
    titleField.classList.add("task-field");
    titleField.id = "task-title-field";

    const descriptionLabel = document.createElement("label");
    descriptionLabel.htmlFor = "task-description-field";
    descriptionLabel.innerText = "Description:";

    const descriptionField = document.createElement("input");
    descriptionField.type = "text";
    descriptionField.classList.add("task-description-field");
    descriptionField.id = "task-description-field";

    const dateLabel = document.createElement("label");
    dateLabel.htmlFor = "task-date-field";
    dateLabel.innerText = "Due date:";

    const dateField = document.createElement("input");
    dateField.type = "date";
    dateField.classList.add("task-date-field");
    dateField.id = "task-date-field";

    const priorityFieldset = document.createElement("fieldset");
    priorityFieldset.innerHTML = `<legend>Priority:</legend>
    <div>
      <input type="radio" id="priorityChoice1"
       name="priority" value="High" checked>
      <label for="contactChoice1">High</label>

      <input type="radio" id="priorityChoice2"
       name="priority" value="Medium">
      <label for="contactChoice2">Medium</label>

      <input type="radio" id="priorityChoice3"
       name="priority" value="Low">
      <label for="contactChoice3">Low</label>
    </div>
  </fieldset>`;

    const taskForm = document.createElement("form");
    taskForm.classList.add("task-form");

    const elementArray = [
      titleLabel,
      titleField,
      descriptionLabel,
      descriptionField,
      dateLabel,
      dateField,
      priorityFieldset,
    ];
    elementArray.forEach((element) => {
      taskForm.appendChild(element);
    });

    return taskForm;
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

    const minimize = document.createElement("button");
    minimize.classList.add("minimize-button");
    minimize.innerText = "Minimize";

    const elementArray = [title, description, dueDate, priority, minimize];
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
    const addForm = createAddForm();
    const addButton = createAddButton();
    root.appendChild(addForm);
    root.appendChild(addButton);
  };

  return {
    expandTask,
    render,
  };
})();

export default todoTaskView;
