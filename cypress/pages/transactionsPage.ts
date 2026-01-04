import { BasePage } from './basePage'

export class TransactionsPage extends BasePage {
  verifyTransaction(note: string) {
    cy.get('p').eq(1).contains(note).should('be.visible')
  }
}
