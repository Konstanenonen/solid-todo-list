import { Project, TodoTask } from "../../interfaces";

const projectFactory = (title: string): Project => {
  const _name: string = title;
  let _todoArray: TodoTask[] = [];

  const getName = () => _name;

  const getTodos = () => _todoArray;

  const addTodo = (task: TodoTask) => {
    _todoArray.push(task);
  };

  const deleteTodo = (id: number) => {
    const newTodoArray = _todoArray.filter((task) => task.id !== id);
    _todoArray.length = 0;
    newTodoArray.forEach((task) => {
      _todoArray.push(task);
    });
  };

  const toggleTodoStatus = (id: number) => {
    _todoArray.forEach((task) => {
      if (task.id === id) task.completed = !task.completed;
    });
  };

  return {
    getName,
    getTodos,
    addTodo,
    deleteTodo,
    toggleTodoStatus,
  };
};

export default projectFactory;
