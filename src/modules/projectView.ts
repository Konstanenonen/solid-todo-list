import { Project } from "../../interfaces";

const projectView = (() => {
    const root = document.getElementById("side-nav");

    const createElements = (projects: Project[]) => {
        const projectElements = projects.map((project) => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.innerHTML = project.getName();

            return projectDiv;
        });

        return projectElements;
    };

    const render = (projects: Project[]) => {
        root.innerHTML = "";
        const elements = createElements(projects);
        elements.forEach((element) => {
            root.appendChild(element);
        })
    };

    return {
        render
    }
})();

export default projectView;
