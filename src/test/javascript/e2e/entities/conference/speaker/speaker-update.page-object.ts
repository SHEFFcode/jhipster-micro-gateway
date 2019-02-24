import { element, by, ElementFinder } from 'protractor';

export default class SpeakerUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.conferenceSpeaker.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#speaker-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#speaker-lastName'));
  emailInput: ElementFinder = element(by.css('input#speaker-email'));
  twitterInput: ElementFinder = element(by.css('input#speaker-twitter'));
  bioInput: ElementFinder = element(by.css('input#file_bio'));
  sessionsSelect: ElementFinder = element(by.css('select#speaker-sessions'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setTwitterInput(twitter) {
    await this.twitterInput.sendKeys(twitter);
  }

  async getTwitterInput() {
    return this.twitterInput.getAttribute('value');
  }

  async setBioInput(bio) {
    await this.bioInput.sendKeys(bio);
  }

  async getBioInput() {
    return this.bioInput.getAttribute('value');
  }

  async sessionsSelectLastOption() {
    await this.sessionsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async sessionsSelectOption(option) {
    await this.sessionsSelect.sendKeys(option);
  }

  getSessionsSelect() {
    return this.sessionsSelect;
  }

  async getSessionsSelectedOption() {
    return this.sessionsSelect.element(by.css('option:checked')).getText();
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
