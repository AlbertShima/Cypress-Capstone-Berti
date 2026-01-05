describe('RWA API - Login', () => {
  it('logs in successfully via API with default user', () => {
    cy.loginByApi()
      .then((response) => {
        expect(response.status).to.be.oneOf([200, 201])
      })
  })

  it('logs in successfully via API with specific user', () => {
    cy.loginByApi({ username: 'Ashima', password: '12345' })
      .its('status')
      .should('be.oneOf', [200, 201])
  })
})
