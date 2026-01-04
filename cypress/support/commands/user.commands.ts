import { apiUrl, retryRequest } from '../utils'

Cypress.Commands.add('getUsers', () => {
  return retryRequest({
    method: 'GET',
    url: apiUrl('/users'),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  } as Cypress.RequestOptions).then((response) => {
    expect(response.status).to.be.oneOf([200, 201])
    return response.body.results
  })
})
