import { Project, TodoTask } from "../../interfaces";

const projectFactory = (title: string, identification: string): Project => {
  const id: string = identification;
  const name: string = title;
  let todoArray: TodoTask[] = [];

  const getName = () => name;

  const getTodos = () => todoArray;

  const addTodo = (task: TodoTask) => {
    todoArray.push(task);
  };

  const deleteTodo = (id: string) => {
    const newTodoArray = todoArray.filter((task) => task.id !== id);
    todoArray.length = 0;
    newTodoArray.forEach((task) => {
      todoArray.push(task);
    });
  };

  const toggleTodoStatus = (id: string) => {
    todoArray.forEach((task) => {
      if (task.id === id) task.completed = !task.completed;
    });
  };

  return {
    id,
    getName,
    getTodos,
    addTodo,
    deleteTodo,
    toggleTodoStatus,
  };
};

export default projectFactory;
