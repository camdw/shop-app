import { ShopAppPage } from './app.po';

describe('shop-app App', () => {
  let page: ShopAppPage;

  beforeEach(() => {
    page = new ShopAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
