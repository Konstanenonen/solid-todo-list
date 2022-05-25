import { Project, ProjectContainer } from "../../interfaces";
import projectFactory from "./projectFactory";

const projectContainer: ProjectContainer = (() => {
    const defaultProject: Project = projectFactory("default", 1);
    const otherProjects: Project[] = [];

    const addProject = (project: Project) => {
        otherProjects.push(project);
    };

    const deleteProject = (id: number) => {
        const filteredProject = otherProjects.filter((project) => project.id !== id);
        otherProjects.length = 0;
        filteredProject.forEach((project) => {
            otherProjects.push(project);
        });
    };

    const getProjectById = (id: number) => {
        if (id === 1) return defaultProject;

        otherProjects.forEach((project) => {
            if (id === project.id ) return project;
        })
    }

    return {
        defaultProject,
        otherProjects,
        addProject,
        deleteProject,
        getProjectById,
    };
})();

export default projectContainer;
