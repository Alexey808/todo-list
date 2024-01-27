
import {setupBrowserHooks, getBrowserState} from './utils';

describe('App test', function () {
  setupBrowserHooks();
  it('is running', async function () {
    const {page} = getBrowserState();

    const pageTitle = await page.mainFrame().title();
    expect(pageTitle).toBe('TodoListFront')
  });
});
