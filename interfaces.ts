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
  otherProjects: Project[];
  currentProjectId: number;
  addProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  getProjectById: (id: number) => Project;
}

export { TodoTask, Project, ProjectContainer };
