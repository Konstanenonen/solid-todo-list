import { Project } from "../../interfaces";
import todoTaskView from "./todoTaskView";
import projectContainer from "./projectContainer";

const projectView = ((taskView, container) => {
  const root = document.getElementById("side-nav");

  const createElements = (projects: Project[]) => {
    const projectElements = projects.map((project) => {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project");

      const projectButton = document.createElement("button");
      projectButton.classList.add("project-button");
      projectButton.innerText = project.getName();
      projectButton.addEventListener("click", () => {
        taskView.render(project.getTodos());
        container.currentProjectId = project.id;
      });

      projectDiv.appendChild(projectButton);

      return projectDiv;
    });

    return projectElements;
  };

  const render = (projects: Project[]) => {
    root.innerHTML = "";
    const elements = createElements(projects);
    elements.forEach((element) => {
      root.appendChild(element);
    });
  };

  return {
    render,
  };
})(todoTaskView, projectContainer);

export default projectView;
