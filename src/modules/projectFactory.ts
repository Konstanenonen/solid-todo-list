import { Project, TodoTask } from "../../interfaces";

const projectFactory = (title: string, identification: number): Project => {
  const id: number = identification;
  const name: string = title;
  let todoArray: TodoTask[] = [];

  const getName = () => name;

  const getTodos = () => todoArray;

  const addTodo = (task: TodoTask) => {
    todoArray.push(task);
  };

  const deleteTodo = (id: number) => {
    todoArray.length = 0;
    const newTodoArray = todoArray.filter((task) => task.id !== id);
    newTodoArray.forEach((task) => {
      todoArray.push(task);
    });
  };

  const toggleTodoStatus = (id: number) => {
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
