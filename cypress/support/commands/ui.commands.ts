//Command for clicking tab EVERYONE/FRIENDS/MINE
Cypress.Commands.add('click_Tab', (linkText: string) => {
  cy.contains('a', linkText).click()
})

//Commands for clicking on menu items Home/My Account/ Bank Accounts etc.
Cypress.Commands.add('click_MenuItem', (menuText: string) => {
  cy.contains('span', menuText)
    .parents('a')
    .click()
    .wait(2000) //Just to slow down a bit for demo purposes
})