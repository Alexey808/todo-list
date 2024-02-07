import { idGen } from '../../utils/id-gen';

export class TodoModel {
  date = new Date().getTime();
  done = false;
  id = idGen();
  title = 'Todo-0';
}
