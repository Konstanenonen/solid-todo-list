import { TodoTask } from "../../interfaces";

const todoTaskFactory = (
  name: string,
  text: string,
  date: string,
  prio: number,
  done: boolean
): TodoTask => {
  const title: string = name;
  const description: string = text;
  const dueDate: string = date;
  const priority: number = prio;
  const completed: boolean = done;

  return {
    title,
    description,
    dueDate,
    priority,
    completed,
  };
};

export default todoTaskFactory;
