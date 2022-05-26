import { Project } from "../../interfaces";

const projectView = (() => {
  const root = document.getElementById("side-nav");

  const createElements = (projects: Project[]) => {
    const projectElements = projects.map((project) => {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project");

      const projectButton = document.createElement("button");
      projectButton.classList.add("project-button");
      projectButton.innerText = project.getName();

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-project-button");
      deleteButton.innerText = "X";

      projectDiv.appendChild(projectButton);
      projectDiv.appendChild(deleteButton);

      return projectDiv;
    });

    return projectElements;
  };

  const createAddProjectbtn = () => {
    const addProjectBtn = document.createElement("button");
    addProjectBtn.classList.add("add-project-button");
    addProjectBtn.innerText = "Add project";

    return addProjectBtn;
  };

  const render = (projects: Project[]) => {
    root.innerHTML = "";
    const elements = createElements(projects);
    elements.forEach((element) => {
      root.appendChild(element);
    });
    const addProjectBtn = createAddProjectbtn();
    root.appendChild(addProjectBtn);
  };

  return {
    render,
  };
})();

export default projectView;
