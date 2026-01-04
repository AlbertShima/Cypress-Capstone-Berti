import { apiUrl } from '../../support/utils'
import type { CreateTransactionInput } from '../../types/transactions'

const username = Cypress.env('USER_LOGIN')
const password = Cypress.env('USER_PASSWORD')
const isCI = Cypress.env('CI') // "true" in pipeline, undefined locally

describe('RWA API E Transactions', () => {
  let receiverId: string

  // Use beforeEach to ensure the user is re-authenticated before each test
  beforeEach(() => {
    cy.loginByApi({ username, password })

    cy.request('GET', `${apiUrl}/users`).then((response) => {
      const users = response.body.results as Array<{ id: string }>
      expect(users.length).to.be.greaterThan(1)
      receiverId = users[1].id
    })
  })
})


it('can create a new transaction via API (using custom command)', () => {
  const tx: CreateTransactionInput = {
    amount: 25,
    note: `API transaction from Cypress ${Date.now()}`,
    receiverId,
    type: 'payment',
  }

  cy.createTransaction(tx) // already asserts status & body shape
})


// This one is LOCAL-ONLY (skipped in CI)
const getTest = isCI ? it.skip : it

getTest(
  'GET /transactions should return a list of transactions with expected shape',
  () => {
    cy.request('GET', `${apiUrl}/transactions`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('results')

      const transactions = response.body.results
      expect(transactions).to.be.an('array')
      expect(transactions.length).to.be.greaterThan(0)

      const first = transactions[0]
      expect(first).to.include.keys([
        'id',
        'amount',
        'senderId',
        'receiverId',
        'description',
      ])
    })
  }
)
