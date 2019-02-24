import { element, by, ElementFinder } from 'protractor';

export default class BlogUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.blogBlog.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#blog-title'));
  authorInput: ElementFinder = element(by.css('input#blog-author'));
  postInput: ElementFinder = element(by.css('textarea#blog-post'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setAuthorInput(author) {
    await this.authorInput.sendKeys(author);
  }

  async getAuthorInput() {
    return this.authorInput.getAttribute('value');
  }

  async setPostInput(post) {
    await this.postInput.sendKeys(post);
  }

  async getPostInput() {
    return this.postInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
