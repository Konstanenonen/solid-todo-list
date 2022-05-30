import projectContainer from "./projectContainer";
import projectFactory from "./projectFactory";
import todoTaskFactory from "./todoTaskFactory";
import projectView from "./projectView";
import todoTaskView from "./todoTaskView";
import { Project, TodoTask } from "../../interfaces";
import makeId from "./makeId";

const appController = ((
  container,
  renderProjects,
  createProject,
  createTodo,
  renderTasks,
  renderProjectTitle,
  expandTodo,
  generateId
) => {
  let currentProject = container.defaultProject;

  const renderCurrentTasks = () => {
    renderProjectTitle(currentProject);
    renderTasks(currentProject.getTodos());
    activateAddTaskButton();
    activateDeleteTaskButtons();
    activateExpandTaskButtons();
  };

  const renderCurrentProjects = () => {
    renderProjects(container.otherProjects);
    renderProjectTitle(currentProject);
    activateProjectButton();
    activateDefaultButton();
    activateOtherProjectButtons();
    activateDeleteProjectButtons();
  };

  const addNewProject = (name: string) => {
    console.log(name);
    const newProject = createProject(name, generateId());
    container.addProject(newProject);
    renderCurrentProjects();
  };

  const addNewTask = (task: TodoTask) => {
    currentProject.addTodo(task);
    renderCurrentTasks();
  };

  const switchProject = (index: number | "default") => {
    if (index === "default") {
      currentProject = container.defaultProject;
      typeof index === "number";
    } else if (typeof index === "number") {
      currentProject = container.otherProjects[index];
    }

    renderCurrentTasks();
  };

  const deleteProject = (index: number) => {
    if (currentProject.id === container.otherProjects[index].id) {
      switchProject("default");
    }

    const projectDeleteId = container.otherProjects[index].id;
    container.deleteProject(projectDeleteId);
    renderCurrentProjects();
  };

  const deleteTask = (id: string) => {
    currentProject.deleteTodo(id);
    renderCurrentTasks();
  };

  const activateDefaultButton = () => {
    const defaultButton = document.querySelector(".default-project");
    defaultButton.addEventListener("click", () => {
      switchProject("default");
    });
  };

  const activateOtherProjectButtons = () => {
    const otherButtonsArray = Array.from(
      document.querySelectorAll(".project-button")
    );
    otherButtonsArray.forEach((button, index) => {
      button.addEventListener("click", () => {
        switchProject(index);
      });
    });
  };

  const activateProjectButton = () => {
    const projectButton = document.querySelector(".add-project-button");
    projectButton.addEventListener("click", () => {
      const projectField = document.querySelector(
        ".project-field"
      ) as HTMLInputElement;
      const projectName = projectField.value;
      addNewProject(projectName);
    });
  };

  const activateAddTaskButton = () => {
    const addTaskButton = document.querySelector(".add-task-button");

    addTaskButton.addEventListener("click", () => {
      const titleField = document.getElementById(
        "task-title-field"
      ) as HTMLInputElement;
      const descriptionField = document.getElementById(
        "task-description-field"
      ) as HTMLInputElement;
      const dateField = document.getElementById(
        "task-date-field"
      ) as HTMLInputElement;

      const taskId = makeId();
      const taskTitle = titleField.value;
      const taskDescription = descriptionField.value;
      const taskDate = dateField.value;

      const newTask = createTodo(
        taskId,
        taskTitle,
        taskDescription,
        taskDate,
        "High"
      );
      addNewTask(newTask);
    });
  };

  const activateDeleteProjectButtons = () => {
    const deleteButtons = Array.from(
      document.querySelectorAll(".delete-project-button")
    );
    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        deleteProject(index);
      });
    });
  };

  const activateDeleteTaskButtons = () => {
    const deleteButtons = Array.from(document.querySelectorAll(".delete-task"));
    const tasks = Array.from(document.querySelectorAll(".todo-task"));
    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const taskId = tasks[index].id;
        deleteTask(taskId);
      });
    });
  };

  const activateExpandTaskButtons = () => {
    const expandButtons = Array.from(document.querySelectorAll(".expand-task"));
    expandButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const todo = currentProject.getTodos()[index];
        expandTodo(todo);
      });
    });
  };

  const start = () => {
    renderCurrentProjects();
    renderCurrentTasks();
  };

  return {
    start,
  };
})(
  projectContainer,
  projectView.render,
  projectFactory,
  todoTaskFactory,
  todoTaskView.render,
  projectView.createNavTitle,
  todoTaskView.expandTask,
  makeId
);

export default appController;
