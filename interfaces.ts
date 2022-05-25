interface TodoTask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  completed: boolean;
}

interface Project {
  id: number;
  getName: () => string;
  getTodos: () => TodoTask[];
  addTodo: (task: TodoTask) => void;
  deleteTodo: (id: number) => void;
  toggleTodoStatus: (id: number) => void;
}

interface ProjectContainer {
  defaultProject: Project;
  activeProject: Project;
  otherProjects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  changeActiveProject: (id: number) => void;
}

export { TodoTask, Project, ProjectContainer };
