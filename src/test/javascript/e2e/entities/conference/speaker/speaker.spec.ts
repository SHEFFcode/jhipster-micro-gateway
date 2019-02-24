/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import SpeakerComponentsPage from './speaker.page-object';
import { SpeakerDeleteDialog } from './speaker.page-object';
import SpeakerUpdatePage from './speaker-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Speaker e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let speakerUpdatePage: SpeakerUpdatePage;
  let speakerComponentsPage: SpeakerComponentsPage;
  let speakerDeleteDialog: SpeakerDeleteDialog;
  const fileToUpload = '../../../../../../main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Speakers', async () => {
    await navBarPage.getEntityPage('speaker');
    speakerComponentsPage = new SpeakerComponentsPage();
    expect(await speakerComponentsPage.getTitle().getText()).to.match(/Speakers/);
  });

  it('should load create Speaker page', async () => {
    await speakerComponentsPage.clickOnCreateButton();
    speakerUpdatePage = new SpeakerUpdatePage();
    expect(await speakerUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Speaker/);
  });

  it('should create and save Speakers', async () => {
    const nbButtonsBeforeCreate = await speakerComponentsPage.countDeleteButtons();

    await speakerUpdatePage.setFirstNameInput('firstName');
    expect(await speakerUpdatePage.getFirstNameInput()).to.match(/firstName/);
    await speakerUpdatePage.setLastNameInput('lastName');
    expect(await speakerUpdatePage.getLastNameInput()).to.match(/lastName/);
    await speakerUpdatePage.setEmailInput('email');
    expect(await speakerUpdatePage.getEmailInput()).to.match(/email/);
    await speakerUpdatePage.setTwitterInput('twitter');
    expect(await speakerUpdatePage.getTwitterInput()).to.match(/twitter/);
    await speakerUpdatePage.setBioInput(absolutePath);
    // speakerUpdatePage.sessionsSelectLastOption();
    await waitUntilDisplayed(speakerUpdatePage.getSaveButton());
    await speakerUpdatePage.save();
    await waitUntilHidden(speakerUpdatePage.getSaveButton());
    expect(await speakerUpdatePage.getSaveButton().isPresent()).to.be.false;

    await speakerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await speakerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Speaker', async () => {
    await speakerComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await speakerComponentsPage.countDeleteButtons();
    await speakerComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    speakerDeleteDialog = new SpeakerDeleteDialog();
    expect(await speakerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.conferenceSpeaker.delete.question/);
    await speakerDeleteDialog.clickOnConfirmButton();

    await speakerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await speakerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
