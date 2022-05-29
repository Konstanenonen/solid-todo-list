import { TodoTask } from "../../interfaces";

const todoTaskFactory = (
  identity: string,
  name: string,
  text: string,
  date: string,
  prio: "Low" | "Medium" | "High"
): TodoTask => {
  return {
    id: identity,
    title: name,
    description: text,
    dueDate: date,
    priority: prio,
  };
};

export default todoTaskFactory;
