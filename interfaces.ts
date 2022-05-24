interface TodoTask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  completed: boolean;
}

interface Project {
  getName: () => string;
  getTodos: () => TodoTask[];
  addTodo: (task: TodoTask) => void;
  deleteTodo: (id: number) => void;
  toggleTodoStatus: (id: number) => void;
}

interface ProjectContainer {
  default: Project;
  otherProjects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: number) => void;
}

export { TodoTask, Project, ProjectContainer };
