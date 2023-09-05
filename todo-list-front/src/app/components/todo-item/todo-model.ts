import { idGen } from "../../utils/id-gen";

export class TodoModel {
  date = new Date().toDateString();
  done = false;
  id = idGen();
  title = `Todo-0`;
}
