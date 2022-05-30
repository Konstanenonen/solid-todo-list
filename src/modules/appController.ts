import projectContainer from "./projectContainer";
import projectFactory from "./projectFactory";
import todoTaskFactory from "./todoTaskFactory";
import projectView from "./projectView";
import todoTaskView from "./todoTaskView";
import { TodoTask } from "../../interfaces";
import makeId from "./makeId";

const appController = ((
  container,
  renderProjects,
  createProject,
  createTodo,
  renderTasks,
  renderProjectTitle,
  expandTodo,
  generateId
) => {
  let currentProject = container.defaultProject;

  const renderCurrentTasks = () => {
    renderProjectTitle(currentProject);
    renderTasks(currentProject.getTodos());
    activateAddTaskButton();
    activateDeleteTaskButtons();
    activateExpandTaskButtons();
  };

  const renderCurrentProjects = () => {
    renderProjects(container.otherProjects);
    renderProjectTitle(currentProject);
    activateProjectButton();
    activateDefaultButton();
    activateOtherProjectButtons();
    activateDeleteProjectButtons();
  };

  const addNewProject = (name: string) => {
    const newProject = createProject(name, generateId());
    container.addProject(newProject);
    renderCurrentProjects();
    saveToLocalStorage();
  };

  const addNewTask = (task: TodoTask) => {
    currentProject.addTodo(task);
    renderCurrentTasks();
    saveToLocalStorage();
  };

  const switchProject = (index: number | "default") => {
    if (index === "default") {
      currentProject = container.defaultProject;
      typeof index === "number";
    } else if (typeof index === "number") {
      currentProject = container.otherProjects[index];
    }

    renderCurrentTasks();
  };

  const deleteProject = (index: number) => {
    if (currentProject.id === container.otherProjects[index].id) {
      switchProject("default");
    }

    const projectDeleteId = container.otherProjects[index].id;
    container.deleteProject(projectDeleteId);
    renderCurrentProjects();
    saveToLocalStorage();
  };

  const deleteTask = (id: string) => {
    currentProject.deleteTodo(id);
    renderCurrentTasks();
    saveToLocalStorage();
  };

  const activateDefaultButton = () => {
    const defaultButton = document.querySelector(".default-project");
    defaultButton.addEventListener("click", () => {
      switchProject("default");
    });
  };

  const activateOtherProjectButtons = () => {
    const otherButtonsArray = Array.from(
      document.querySelectorAll(".project-button")
    );
    otherButtonsArray.forEach((button, index) => {
      button.addEventListener("click", () => {
        switchProject(index);
      });
    });
  };

  const activateProjectButton = () => {
    const projectButton = document.querySelector(".add-project-button");
    projectButton.addEventListener("click", () => {
      const projectField = document.querySelector(
        ".project-field"
      ) as HTMLInputElement;
      const projectName = projectField.value;
      addNewProject(projectName);
    });
  };

  const activateAddTaskButton = () => {
    const addTaskButton = document.querySelector(".add-task-button");

    addTaskButton.addEventListener("click", () => {
      const titleField = document.getElementById(
        "task-title-field"
      ) as HTMLInputElement;
      const descriptionField = document.getElementById(
        "task-description-field"
      ) as HTMLInputElement;
      const dateField = document.getElementById(
        "task-date-field"
      ) as HTMLInputElement;
      const radioButtons = Array.from(
        document.querySelectorAll("input[type=radio]")
      ) as HTMLInputElement[];

      const taskId = makeId();
      const taskTitle = titleField.value;
      const taskDescription = descriptionField.value;
      const taskDate = dateField.value;
      let taskPriority: "Low" | "Medium" | "High" = "High";
      radioButtons.forEach((button) => {
        if (button.checked)
          taskPriority = button.value as "Low" | "Medium" | "High";
      });

      const newTask = createTodo(
        taskId,
        taskTitle,
        taskDescription,
        taskDate,
        taskPriority
      );
      addNewTask(newTask);
    });
  };

  const activateDeleteProjectButtons = () => {
    const deleteButtons = Array.from(
      document.querySelectorAll(".delete-project-button")
    );
    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        deleteProject(index);
      });
    });
  };

  const activateDeleteTaskButtons = () => {
    const deleteButtons = Array.from(document.querySelectorAll(".delete-task"));
    const tasks = Array.from(document.querySelectorAll(".todo-task"));
    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const taskId = tasks[index].id;
        deleteTask(taskId);
      });
    });
  };

  const activateExpandTaskButtons = () => {
    const expandButtons = Array.from(document.querySelectorAll(".expand-task"));
    expandButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const todo = currentProject.getTodos()[index];
        expandTodo(todo);
        activateMinimizeTaskButtons();
      });
    });
  };

  const activateMinimizeTaskButtons = () => {
    const minimizeButton = Array.from(
      document.querySelectorAll(".minimize-button")
    );
    minimizeButton.forEach((button) => {
      button.addEventListener("click", renderCurrentTasks);
    });
  };

  const saveToLocalStorage = () => {
    const defaultTodos = container.defaultProject.getTodos();
    const jsonDefaultTodos = JSON.stringify(defaultTodos);
    localStorage.setItem("default-todos", jsonDefaultTodos);

    const otherProjects: object[] = [];
    container.otherProjects.forEach((project) => {
      const projectObject = {
        name: project.getName(),
        tasks: project.getTodos(),
        id: project.id,
      };
      otherProjects.push(projectObject);
    });

    const jsonOtherProjects = JSON.stringify(otherProjects);
    localStorage.setItem("other-projects", jsonOtherProjects);
  };

  const fetchFromLocalStorage = () => {
    const defaultTodos: TodoTask[] = JSON.parse(
      localStorage.getItem("default-todos")
    );

    if (defaultTodos === null) return;

    defaultTodos.forEach((todo) => {
      container.defaultProject.addTodo(todo);
    });

    const otherProjects: object[] = JSON.parse(
      localStorage.getItem("other-projects")
    );
    if (otherProjects === null) return;

    otherProjects.forEach(
      (project: { name: string; tasks: TodoTask[]; id: string }) => {
        const newProject = createProject(project.name, project.id);
        project.tasks.forEach((task) => {
          newProject.addTodo(task);
        });
        container.addProject(newProject);
      }
    );
  };

  const start = () => {
    fetchFromLocalStorage();
    renderCurrentProjects();
    renderCurrentTasks();
  };

  return {
    start,
  };
})(
  projectContainer,
  projectView.render,
  projectFactory,
  todoTaskFactory,
  todoTaskView.render,
  projectView.createNavTitle,
  todoTaskView.expandTask,
  makeId
);

export default appController;
