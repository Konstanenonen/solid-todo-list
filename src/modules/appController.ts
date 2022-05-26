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
  generateId
) => {
  const addTodoListeners = (project: Project) => {
    const addButton = document.querySelector(".add-task-button");
    addButton.addEventListener("click", () => {
      const taskId = generateId();
      const todo = createTodo(taskId, "testi", "testi", "testi", 1, false);
      project.addTodo(todo);
      renderTasks(project.getTodos());
      addTodoListeners(project);
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
      addTodoListeners(container.defaultProject);
    });

    const projectButtons = Array.from(
      document.querySelectorAll(".project-button")
    );
    projectButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        renderTasks(container.otherProjects[index].getTodos());
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
      container.addProject(createProject("testi", generateId()));
      renderProjects(container.otherProjects);
      addProjectListeners();
    });
  };

  const init = () => {
    renderTasks(container.defaultProject.getTodos());
    addTodoListeners(container.defaultProject);
    renderProjects(container.otherProjects);
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
  makeId
);

export default appController;
