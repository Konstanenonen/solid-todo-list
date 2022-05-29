import projectContainer from "./projectContainer";
import projectFactory from "./projectFactory";
import todoTaskFactory from "./todoTaskFactory";
import projectView from "./projectView";
import todoTaskView from "./todoTaskView";
import { Project } from "../../interfaces";
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
  const addTodoListeners = (project: Project) => {
    const addButton = document.querySelector(".add-task-button");
    addButton.addEventListener("click", () => {
      const taskId = generateId();
      const taskField = document.querySelector(
        ".task-field"
      ) as HTMLInputElement;
      const taskTitle = taskField.value;
      const todo = createTodo(
        taskId,
        taskTitle,
        "testi",
        "Päivämäärä",
        1,
        false
      );
      project.addTodo(todo);
      renderTasks(project.getTodos());
      addTodoListeners(project);
    });

    const expandButtons = Array.from(document.querySelectorAll(".expand-task"));
    expandButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        expandTodo(project.getTodos()[index]);
      });
    });

    const deleteButtons = Array.from(document.querySelectorAll(".delete-task"));
    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const todoId = project.getTodos()[index].id;
        project.deleteTodo(todoId);
        renderTasks(project.getTodos());
        addTodoListeners(project);
      });
    });
  };

  const addProjectListeners = () => {
    const defaultButton = document.querySelector(".default-project");
    defaultButton.addEventListener("click", () => {
      renderTasks(container.defaultProject.getTodos());
      renderProjectTitle(container.defaultProject);
      addTodoListeners(container.defaultProject);
    });

    const projectButtons = Array.from(
      document.querySelectorAll(".project-button")
    );
    projectButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        renderTasks(container.otherProjects[index].getTodos());
        renderProjectTitle(container.otherProjects[index]);
        addTodoListeners(container.otherProjects[index]);
      });
    });

    const deleteButtons = Array.from(
      document.querySelectorAll(".delete-project-button")
    );
    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const projectId = container.otherProjects[index].id;
        container.deleteProject(projectId);
        renderProjects(container.otherProjects);
        addProjectListeners();
      });
    });

    const addProjectBtn = document.querySelector(".add-project-button");
    addProjectBtn.addEventListener("click", () => {
      const projectField = document.querySelector(
        ".project-field"
      ) as HTMLInputElement;
      const projectTitle = projectField.value;
      container.addProject(createProject(projectTitle, generateId()));
      renderProjects(container.otherProjects);
      addProjectListeners();
    });
  };

  const init = () => {
    renderTasks(container.defaultProject.getTodos());
    addTodoListeners(container.defaultProject);
    renderProjects(container.otherProjects);
    renderProjectTitle(container.defaultProject);
    addProjectListeners();
  };

  return {
    init,
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
