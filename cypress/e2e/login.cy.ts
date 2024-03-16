/**
 * - Login spec
 *   - should display login page correctly
 *   - should render alert when email is empty
 *   - should render alert when password is empty
 *   - should render alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

/// <reference types="cypress" />
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="example@mail.com"]').should('be.visible');
    cy.get('input[placeholder="Password*"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should render alert when email is empty', () => {
    // mengisi password
    cy.get('input[placeholder="Password*"]').type('secret_password');

    // klik tombol login tanpa mengisi password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi alert untuk menampilkan pesan
    cy.get('span').should('be.visible').and('contain', 'Email is required');
  });

  it('should render alert when password is empty', () => {
  // mengisi email
    cy.get('input[placeholder="example@mail.com"]').type('johndoe@mail.co.id');
    // klik tombol login tanpa mengisi password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi alert untuk menampilkan pesan
    cy.get('span').should('be.visible').and('contain', 'Password is required');
  });

  it('should render alert when email or password are wrong', () => {
    // mengisi email
    cy.get('input[placeholder="example@mail.com"]').type('johndoe@mail.co.id');

    // mengisi password yang salah
    cy.get('input[placeholder="Password*"]').type('wrong_password');

    // klik tombol login tanpa mengisi password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi alert untuk menampilkan pesan
    cy.get('span').should('be.visible').and('contain', 'email or password is wrong');
  });

  it('should display homepage when username and password are correct', () => {
    // mengisi username
    cy.get('input[placeholder="example@mail.com"]').type('johndoe@mail.co.id');

    // mengisi password
    cy.get('input[placeholder="Password*"]').type('secret_password');

    // menekan tombol Login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('nav')
      .contains(/^Threads$/)
      .should('be.visible');
    cy.get('h1').should('be.visible').and('contain', 'Forum App');
  });
});
