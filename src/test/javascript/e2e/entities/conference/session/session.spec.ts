/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import SessionComponentsPage from './session.page-object';
import { SessionDeleteDialog } from './session.page-object';
import SessionUpdatePage from './session-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Session e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sessionUpdatePage: SessionUpdatePage;
  let sessionComponentsPage: SessionComponentsPage;
  let sessionDeleteDialog: SessionDeleteDialog;
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

  it('should load Sessions', async () => {
    await navBarPage.getEntityPage('session');
    sessionComponentsPage = new SessionComponentsPage();
    expect(await sessionComponentsPage.getTitle().getText()).to.match(/Sessions/);
  });

  it('should load create Session page', async () => {
    await sessionComponentsPage.clickOnCreateButton();
    sessionUpdatePage = new SessionUpdatePage();
    expect(await sessionUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Session/);
  });

  it('should create and save Sessions', async () => {
    const nbButtonsBeforeCreate = await sessionComponentsPage.countDeleteButtons();

    await sessionUpdatePage.setTitleInput('title');
    expect(await sessionUpdatePage.getTitleInput()).to.match(/title/);
    await sessionUpdatePage.setDescriptionInput(absolutePath);
    await sessionUpdatePage.setStartDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await sessionUpdatePage.getStartDateTimeInput()).to.contain('2001-01-01T02:30');
    await sessionUpdatePage.setEndDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await sessionUpdatePage.getEndDateTimeInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(sessionUpdatePage.getSaveButton());
    await sessionUpdatePage.save();
    await waitUntilHidden(sessionUpdatePage.getSaveButton());
    expect(await sessionUpdatePage.getSaveButton().isPresent()).to.be.false;

    await sessionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await sessionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Session', async () => {
    await sessionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await sessionComponentsPage.countDeleteButtons();
    await sessionComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    sessionDeleteDialog = new SessionDeleteDialog();
    expect(await sessionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.conferenceSession.delete.question/);
    await sessionDeleteDialog.clickOnConfirmButton();

    await sessionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await sessionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
