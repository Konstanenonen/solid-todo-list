import projectContainer from "./projectContainer";
import projectFactory from "./projectFactory";
import todoTaskFactory from "./todoTaskFactory";
import projectView from "./projectView";

const appController = ((
  projectContainer,
  projectView,
  projectFactory,
  createTodo
) => {
  const container = projectContainer;
  const projectViewer = projectView;
  const createProject = projectFactory;

  const addProject = (name: string) => {
    container.addProject(createProject(name, Date.now()));
    projectViewer.render(container.otherProjects);
  };

  const addTodo = (
    title: string,
    description: string,
    dueDate: string,
    priority: number,
    completed: boolean
  ) => {
    const task = createTodo(
      Date.now(),
      title,
      description,
      dueDate,
      priority,
      completed
    );
    container.currentProjectId = container.otherProjects[0].id;
    container.getProjectById(container.currentProjectId).addTodo(task);
    projectViewer.render(container.otherProjects);
  };

  return {
    addProject,
    addTodo,
  };
})(projectContainer, projectView, projectFactory, todoTaskFactory);

export default appController;
