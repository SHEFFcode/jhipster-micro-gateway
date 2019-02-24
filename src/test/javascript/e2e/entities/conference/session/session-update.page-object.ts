import { element, by, ElementFinder } from 'protractor';

export default class SessionUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.conferenceSession.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#session-title'));
  descriptionInput: ElementFinder = element(by.css('input#file_description'));
  startDateTimeInput: ElementFinder = element(by.css('input#session-startDateTime'));
  endDateTimeInput: ElementFinder = element(by.css('input#session-endDateTime'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setStartDateTimeInput(startDateTime) {
    await this.startDateTimeInput.sendKeys(startDateTime);
  }

  async getStartDateTimeInput() {
    return this.startDateTimeInput.getAttribute('value');
  }

  async setEndDateTimeInput(endDateTime) {
    await this.endDateTimeInput.sendKeys(endDateTime);
  }

  async getEndDateTimeInput() {
    return this.endDateTimeInput.getAttribute('value');
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
