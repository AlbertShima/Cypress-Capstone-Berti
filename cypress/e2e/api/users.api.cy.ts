import { apiUrl } from '../../support/utils'

const username = Cypress.env('USER_LOGIN')
const password = Cypress.env('USER_PASSWORD')

describe('RWA API - Users', () => {
  it('GET /users should return a list of users', () => {
    cy.loginByApi({ username, password })

    cy.request('GET', apiUrl('/users')).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('results')
      expect(response.body.results).to.be.an('array')
      expect(response.body.results.length).to.be.greaterThan(0)

      const firstUser = response.body.results[0]
      expect(firstUser).to.include.keys('id', 'username', 'firstName', 'lastName')
    })
  })

  it('GET /users/:id should return 401 for another user', () => {
    cy.loginByApi({ username, password })

    // 1) fetch the visible users list
    cy.request('GET', apiUrl('/users')).then((listResponse) => {
      const users = listResponse.body.results as Array<{ id: string; username: string }>
      expect(users.length).to.be.greaterThan(1)

      // pick a user that is NOT the logged-in user
      const otherUser = users.find((u) => u.username !== username)
      expect(otherUser, 'other user present in /users list').to.exist

      // 2) try to GET that user's details and assert 401
      cy.request({
        method: 'GET',
        url: apiUrl(`/users/${otherUser!.id}`),
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.eq(401)
        expect(resp.body).to.have.property('error')
      })
    })
  })

})
