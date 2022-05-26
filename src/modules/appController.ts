import projectContainer from "./projectContainer";
import projectFactory from "./projectFactory";
import todoTaskFactory from "./todoTaskFactory";
import projectView from "./projectView";
import todoTaskView from "./todoTaskView";
import { Project } from "../../interfaces";

const appController = ((
  projectContainer,
  projectView,
  projectFactory,
  createTodo,
  taskView
) => {
  const container = projectContainer;
  const projectViewer = projectView;
  const createProject = projectFactory;

  const addTodoListeners = (project: Project) => {
    const addButton = document.querySelector(".add-task-button");
    addButton.addEventListener("click", () => {
      const todo = createTodo(Date.now(), "testi", "testi", "testi", 1, false);
      project.addTodo(todo);
      taskView.render(project.getTodos());
      addTodoListeners(project);
    });
  };

  const addProjectBtnListeners = () => {
    const projectButtons = Array.from(
      document.querySelectorAll(".project-button")
    );
    projectButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        taskView.render(container.otherProjects[index].getTodos());
        addTodoListeners(container.otherProjects[index]);
      });
    });
  };

  const addProject = (name: string) => {
    container.addProject(createProject(name, Date.now()));
    projectViewer.render(container.otherProjects);
    addProjectBtnListeners();
  };

  return {
    addProject,
  };
})(
  projectContainer,
  projectView,
  projectFactory,
  todoTaskFactory,
  todoTaskView
);

export default appController;
