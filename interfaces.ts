interface TodoTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
}

interface Project {
  id: string;
  getName: () => string;
  getTodos: () => TodoTask[];
  addTodo: (task: TodoTask) => void;
  deleteTodo: (id: string) => void;
}

interface ProjectContainer {
  defaultProject: Project;
  otherProjects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  getProjectById: (id: string) => Project;
}

export { TodoTask, Project, ProjectContainer };
