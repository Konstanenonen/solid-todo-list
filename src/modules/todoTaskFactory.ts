import { TodoTask } from "../../interfaces";

const todoTaskFactory = (
  identity: number,
  name: string,
  text: string,
  date: string,
  prio: number,
  done: boolean
): TodoTask => {
  const id: number = identity;
  const title: string = name;
  const description: string = text;
  const dueDate: string = date;
  const priority: number = prio;
  const completed: boolean = done;

  return {
    id,
    title,
    description,
    dueDate,
    priority,
    completed,
  };
};

export default todoTaskFactory;
