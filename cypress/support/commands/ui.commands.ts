Cypress.Commands.add('click_Tab', (linkText: string) => {
  cy.contains('a', linkText).click()
})