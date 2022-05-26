import { Project, ProjectContainer } from "../../interfaces";
import projectFactory from "./projectFactory";

const projectContainer: ProjectContainer = (() => {
  const defaultProject: Project = projectFactory("default", "default");
  const otherProjects: Project[] = [];

  const addProject = (project: Project) => {
    otherProjects.push(project);
  };

  const deleteProject = (id: string) => {
    const filteredProject = otherProjects.filter(
      (project) => project.id !== id
    );
    otherProjects.length = 0;
    filteredProject.forEach((project) => {
      otherProjects.push(project);
    });
  };

  const getProjectById = (id: string) => {
    if (id === "default") return defaultProject;

    for (let i = 0; i < otherProjects.length; i++) {
      if (otherProjects[i].id === id) return otherProjects[i];
    }
  };

  return {
    defaultProject,
    otherProjects,
    addProject,
    deleteProject,
    getProjectById,
  };
})();

export default projectContainer;
