import { ElementHandle, Page } from 'puppeteer';
import { setupBrowserHooks, getBrowserState } from './utils';


describe('App test', () => {
  let page: Page;
  let newTodoCard: ElementHandle<Element> | null;
  let newTodoId: string;

  setupBrowserHooks();

  beforeEach(() => {
    page = getBrowserState().page;
  })

  it('is running, should get page title', async () => {
    const pageTitle = await page.mainFrame().title();
    expect(pageTitle).toBe('TodoListFront')
  });

  it('should get title', async () => {
    const title = await page.$eval('[data-id="todo-list-title"]', (el: Element) => el.textContent);
    expect(title).toBe('TODO LIST');
  });

  it('should add new todo', async () => {
    const reqAdd = page.waitForRequest((req) =>
      req.url().includes('api/todo/add') && req.method() === 'POST'
    );
    const todoItemsBeforeLength = (await page.$$('[data-id="todo-item_todo-card"]'))?.length;

    const addButton = await page.waitForSelector('[data-id="todo-list_add-new-todo"]');
    await addButton?.click();
    const amountOfItems = (await page.$$('[data-id="todo-item_todo-card"]'))?.length;


    expect(await reqAdd).toBeTruthy();
    expect(amountOfItems).toBe(todoItemsBeforeLength + 1);
  });

  describe('change todo', () => {
    beforeEach(async () => {
      const addButton = await page.waitForSelector('[data-id="todo-list_add-new-todo"]');
      await addButton?.click();

      const reqAdd = await page.waitForRequest((req) =>
        req.url().includes('api/todo/add')
      );

      newTodoCard = await page.waitForSelector('[data-id="todo-item_todo-card"]');
      newTodoId = JSON.parse(reqAdd.postData() || '')?.data.id;
    });

    it('should edit title', async () => {
      const editButton = await newTodoCard?.waitForSelector('[data-id="todo-item_edit-button"]');
      await editButton?.click();
      const inputField = await newTodoCard?.waitForSelector('[data-id="todo-item_input-field"]');
      await inputField?.evaluate((inputField) => (inputField as HTMLInputElement).value = '', inputField);
      await inputField?.focus();
      await page.keyboard.type('test');

      const saveButton = await page.waitForSelector('[data-id="todo-item_save-button"]');
      await saveButton?.click();

      const reqUpdate = await page.waitForRequest((req) =>
        req.url().includes('api/todo/update') && req.method() === 'PUT'
      );
      const body = JSON.parse(reqUpdate?.postData() || '');

      expect(body.data.title).toEqual('test');
    });

    it('should change done', async () => {
      const checkBox = await newTodoCard?.waitForSelector('[data-id="todo-item_done"]');
      await checkBox?.click();

      const reqUpdate = await page.waitForRequest((req) =>
        req.url().includes('api/todo/update') && req.method() === 'PUT'
      );

      const body = JSON.parse(reqUpdate?.postData() || '');

      expect(body.data.done).toBeTruthy();
    });

    it('should delete todo', async () => {
      const deleteButton = await newTodoCard?.waitForSelector('[data-id="todo-item_delete-button"]');
      await deleteButton?.click();

      const reqDelete = await page.waitForRequest((req) =>
        req.url().includes('api/todo/delete')
        && req.url().includes(newTodoId)
        && req.method() === 'DELETE'
      );

      expect(reqDelete).toBeTruthy();
    });
  });

});
