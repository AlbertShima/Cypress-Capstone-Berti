import { CreateTransactionInput } from '../types/transactions'

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>
      loginByApi(options?: { username?: string; password?: string }): Chainable<any>
      createTransaction(input: CreateTransactionInput): Chainable<void>
      click_Tab(linkText: string): Chainable<JQuery<HTMLElement>>;
      getUsers(): Chainable<any[]>
    }
  }
}

export {}
