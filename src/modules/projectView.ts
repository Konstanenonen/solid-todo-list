import { Project } from "../../interfaces";

const projectView = (() => {
  const root = document.getElementById("side-nav");
  const topNav = document.getElementById("project-title-area");

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

  const createAddProjectField = () => {
    const addProjectField = document.createElement("input");
    addProjectField.type = "text";
    addProjectField.classList.add("project-field");

    return addProjectField;
  };

  const createAddProjectbtn = () => {
    const addProjectBtn = document.createElement("button");
    addProjectBtn.classList.add("add-project-button");
    addProjectBtn.innerText = "Add project";

    return addProjectBtn;
  };

  const createNavTitle = (project: Project) => {
    topNav.innerHTML = "";
    const navTitle = document.createElement("h2");
    navTitle.classList.add("project-nav-title");
    navTitle.innerText = project.getName();
    topNav.appendChild(navTitle);
  };

  const render = (projects: Project[]) => {
    root.innerHTML = "";
    const elements = createElements(projects);
    elements.forEach((element) => {
      root.appendChild(element);
    });
    const projectField = createAddProjectField();
    const addProjectBtn = createAddProjectbtn();
    root.appendChild(projectField);
    root.appendChild(addProjectBtn);
  };

  return {
    createNavTitle,
    render,
  };
})();

export default projectView;
