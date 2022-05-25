import { Project, ProjectContainer } from "../../interfaces";
import projectFactory from "./projectFactory";

const projectContainer: ProjectContainer = (() => {
    const defaultProject: Project = projectFactory("default", 1);
    let activeProject: Project = defaultProject;
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
    }

    const changeActiveProject = (id: number) => {
        if (id === 1) activeProject = defaultProject;

        otherProjects.forEach((project) => {
            if (project.id === id) activeProject = project;
        });
    }

    return {
        defaultProject,
        activeProject,
        otherProjects,
        addProject,
        deleteProject,
        changeActiveProject
    };
})();

export default projectContainer;
