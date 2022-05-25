import { Project, ProjectContainer } from "../../interfaces";
import projectFactory from "./projectFactory";

const projectContainer: ProjectContainer = (() => {
  const defaultProject: Project = projectFactory("default", 1);
  const otherProjects: Project[] = [];
  const currentProjectId = 1;

  const addProject = (project: Project) => {
    otherProjects.push(project);
  };

  const deleteProject = (id: number) => {
    const filteredProject = otherProjects.filter(
      (project) => project.id !== id
    );
    otherProjects.length = 0;
    filteredProject.forEach((project) => {
      otherProjects.push(project);
    });
  };

  const getProjectById = (id: number) => {
    if (id === 1) return defaultProject;

    for (let i = 0; i < otherProjects.length; i++) {
      if (otherProjects[i].id === id) return otherProjects[i];
    }
  };

  return {
    defaultProject,
    otherProjects,
    currentProjectId,
    addProject,
    deleteProject,
    getProjectById,
  };
})();

export default projectContainer;
