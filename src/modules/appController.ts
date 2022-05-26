import projectContainer from "./projectContainer";
import projectFactory from "./projectFactory";
import todoTaskFactory from "./todoTaskFactory";
import projectView from "./projectView";
import todoTaskView from "./todoTaskView";
import { Project } from "../../interfaces";

const appController = ((
  container,
  renderProjects,
  createProject,
  createTodo,
  renderTasks
) => {
  const addTodoListeners = (project: Project) => {
    const addButton = document.querySelector(".add-task-button");
    addButton.addEventListener("click", () => {
      const todo = createTodo(Date.now(), "testi", "testi", "testi", 1, false);
      project.addTodo(todo);
      renderTasks(project.getTodos());
      addTodoListeners(project);
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

    const addProjectBtn = document.querySelector(".add-project-button");
    addProjectBtn.addEventListener("click", () => {
      container.addProject(createProject("testi", Date.now()));
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
  todoTaskView.render
);

export default appController;
