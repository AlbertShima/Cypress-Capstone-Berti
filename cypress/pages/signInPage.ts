import { BasePage } from './basePage'

export class SignInPage extends BasePage {
  visit() {
    cy.visit('/signin')
  }

  loginAs(username: string, password: string) {
    this.get('#username').type(username)
    this.get('#password').type(password)
    this.get('button[type="submit"]').click()
  }
}
