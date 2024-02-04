
import { Browser, Page, launch, HTTPRequest } from 'puppeteer';

const baseUrl = process.env['baseUrl'] ?? 'http://localhost:4201/';
let browser: Browser;
let page: Page;


export function setupBrowserHooks(path = ''): void {

  beforeAll(async () => {
    browser = await launch({
      dumpio: true ,
      headless: 'new',
      // headless: false,
      // devtools: true,
      slowMo: 1
    });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    
    await page.setRequestInterception(true);

    mockRequest();

    await page.goto(`${baseUrl}${path}`);
  });

  afterEach(async () => {
    await page?.close();
  });


  afterAll(async () => {
    await browser?.close();
  });

}

export function getBrowserState(): {
  browser: Browser;
  page: Page;
  baseUrl: string;
} {
  if (!browser) {
    throw new Error(
      'No browser state found! Ensure `setupBrowserHooks()` is called.'
    );
  }
  return {
    browser,
    page,
    baseUrl,
  };
}

function mockRequest(): void {
  page.on('request', (interceptedRequest) => {
    const isIncludedApi = [
      setInterceptRequest(interceptedRequest, 'api/todo/getAll', 200, []),
      setInterceptRequest(interceptedRequest, 'api/todo/add', 200, true),
      setInterceptRequest(interceptedRequest, 'api/todo/delete', 200, true),
      setInterceptRequest(interceptedRequest, 'api/todo/update', 200, true),
    ];
    
    if (isIncludedApi.some((isIncluded: boolean) => isIncluded)) {
      return;
    } else {
      interceptedRequest.continue();
    }
  });
}

function setInterceptRequest(
  interceptedRequest: HTTPRequest,
  api: string,
  status: number,
  body: any
): boolean {
  const isIncludedApi = interceptedRequest.url().includes(api);
  if (isIncludedApi) {
    interceptedRequest.respond({
      status,
      contentType: 'text/plain',
      body: JSON.stringify(body)
    });
  }

  return isIncludedApi;
}
