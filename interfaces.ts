interface TodoTask {
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  completed: boolean;
}

interface Project {
  name: string;
  todoArray: TodoTask[];
  addTodo: (task: TodoTask) => void;
  deleteTodo: (index: number) => void;
  toggleStatus: (index: number) => void;
}

interface ProjectContainer {
  default: Project;
  otherProjects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (index: number) => void;
}

export { TodoTask, Project, ProjectContainer };
