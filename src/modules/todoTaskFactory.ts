import { TodoTask } from "../../interfaces";

const todoTaskFactory = (
  identity: number,
  name: string,
  text: string,
  date: string,
  prio: number,
  done: boolean
): TodoTask => {

  return {
    id: identity,
    title: name,
    description: text,
    dueDate: date,
    priority: prio,
    completed: done,
  };
};

export default todoTaskFactory;
