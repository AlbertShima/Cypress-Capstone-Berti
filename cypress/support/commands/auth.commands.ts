import { apiUrl, retryRequest } from '../utils'
// @ts-ignore

Cypress.Commands.add(
  'loginByApi',
  (options: { username?: string; password?: string } = {}) => {
    const username = options.username || Cypress.env('USER_LOGIN')
    const password = options.password || Cypress.env('USER_PASSWORD')

    return retryRequest({
      method: 'POST',
      url: apiUrl('/login'),
      body: { type: 'LOGIN', username, password },
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      encoding: null,
      followRedirect: false,
      form: false,
      gzip: false,
      qs: undefined,
      log: false,
      timeout: 0,
      failOnStatusCode: false,
      retryOnStatusCodeFailure: false,
      retryOnNetworkFailure: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201])
      return response
    })
  }
)


Cypress.Commands.add('createTransaction', (input: CreateTransactionInput) => {
  return retryRequest({
    method: 'POST',
    url: apiUrl('/transactions'),
    body: {
      amount: input.amount,
      description: input.note,
      receiverId: input.receiverId,
      transactionType: input.type ?? 'payment',
    },
  } as Cypress.RequestOptions).then((response) => {
    expect(response.status).to.be.oneOf([200, 201])
    const transaction = response.body.transaction ?? response.body
    expect(transaction.amount).to.eq(input.amount * 100)
    expect(transaction.receiverId).to.eq(input.receiverId)
    return transaction
  })
})
