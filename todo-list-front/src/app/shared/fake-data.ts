import { ITodo } from "../components/todo-item/todo-item.interfaces";
import { idGen } from "../utils/id-gen";

export const TODO_LIST: ITodo[] = Array.from({length: 10}).map((_, i) => {
  return {
    date: new Date().toDateString(),
    done: false,
    id: idGen(),
    title: `Todo-${i}`
  }
});
