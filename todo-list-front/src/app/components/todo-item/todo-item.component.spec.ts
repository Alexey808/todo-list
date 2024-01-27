import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { ITodo } from './todo-item.interfaces';
import { By } from '@angular/platform-browser';

const testTodo: ITodo = {
  date: 946670400000, // 01.01.2000
  done: true,
  id: "t-100000000000",
  title: "Todo-0",
}

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        TodoItemComponent
      ],
    });
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set todo and set todoForm', () => {
    component.todoItem = testTodo;

    expect(component.todo).toEqual(testTodo);
    expect(component.todoForm.getRawValue()).toEqual({ done: true, title: 'Todo-0' });
  });

  it('should change isEdit', () => {
    expect(component.isEdit).toBeFalsy();

    component.onEdit();

    expect(component.isEdit).toBeTruthy();
  });

  describe('onDelete', () => {
    beforeEach(() => {
      jest.spyOn(component.deleteTodo, 'emit');
    });

    it('should emit deleteTodo if has todoId', () => {
      component.todoItem = testTodo;
  
      expect(component.todo?.id).not.toBeNull();
  
      component.onDelete();
  
      expect(component.deleteTodo.emit).toHaveBeenCalledWith(testTodo.id);
    });
  
    it('should not emit deleteTodo if todoId is not defined', () => {
      expect(component.todo).toBeNull();
  
      component.onDelete();
  
      expect(component.deleteTodo.emit).not.toHaveBeenCalled();
    });
  });

  describe('onSave', () => {
    beforeEach(() => {
      jest.spyOn(component.updateTodo, 'emit');
    });

    it('should change onEdit and emit updateTodo with todo if has todo id', () => {
      expect(component.isEdit).toBeFalsy();

      component.todoItem = testTodo;
      component.onSave();

      expect(component.isEdit).toBeTruthy();
      expect(component.updateTodo.emit).toHaveBeenCalledWith(testTodo);
    });

    it('should not emit updateTodo if todo id is not defined', () => {
      component.onSave();

      expect(component.updateTodo.emit).not.toHaveBeenCalled();
    });
  });

  describe('onDone', () => {
    beforeEach(() => {
      jest.spyOn(component.updateTodo, 'emit');
    });

    it('should emit updateTodo with todo if has todo id', () => {
      component.todoItem = testTodo;
      component.onDone();

      expect(component.updateTodo.emit).toHaveBeenCalledWith(testTodo);
    });

    it('should not emit updateTodo if todo id is not defined', () => {
      expect(component.todo).toBeNull();

      component.onDone();

      expect(component.updateTodo.emit).not.toHaveBeenCalled();
    });
  });

  describe('DOM', () => {
    beforeEach(() => {
      component.todoItem = testTodo;
    });
    
    it('should visible element with class todo-item if has todo', () => {
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('.todo-item'))?.nativeElement;
      
      expect(element).toBeTruthy();
    });
    
    it('should visible done checkbox and call onDone by click', () => {
      jest.spyOn(component, 'onDone');
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('[formControlName="done"]'))?.nativeElement;
      element.click();

      expect(element).toBeTruthy();
      expect(component.onDone).toHaveBeenCalled();
    });
    
    it('should visible input title if isEdit is true', () => {
      component.isEdit = true;
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('[formControlName="title"]'))?.nativeElement;

      expect(element).toBeTruthy();
    });
    
    it('should visible title text if isEdit is false', () => {
      component.isEdit = false;
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('.todo-title'))?.nativeElement;

      expect(element?.textContent).toBe(' Todo-0 ');
    });
    
    it('should visible date', () => {
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('.todo-date'))?.nativeElement;

      expect(element?.textContent).toBe('01.01.2000');
    });
    
    it('should visible edit button if isEdit is false and isSaved is false, and call onEdit by click', () => {
      jest.spyOn(component, 'onEdit');
      component.isEdit = false;
      component.isSaved = false;
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('.edit-button'))?.nativeElement;
      element.click();

      expect(element).toBeTruthy();
      expect(component.onEdit).toHaveBeenCalled();
    });
    
    it('should visible save button if isEdit is true and isSaved is true, and call onSave by click', () => {
      jest.spyOn(component, 'onSave');
      component.isEdit = true;
      component.isSaved = true;
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('.save-button'))?.nativeElement;
      element.click();

      expect(element).toBeTruthy();
      expect(component.onSave).toHaveBeenCalled();
    });
    
    it('should visible delete button, and call onDelete by click', () => {
      jest.spyOn(component, 'onDelete');
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('.delete-button'))?.nativeElement;
      element.click();

      expect(element).toBeTruthy();
      expect(component.onDelete).toHaveBeenCalled();
    });
  });
});
