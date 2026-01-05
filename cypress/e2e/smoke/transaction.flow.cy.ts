import { SignInPage } from '@pages/signInPage'
import { TransactionsPage } from '@pages/transactionsPage'

describe('RWA API - Transactions', () => {
  it('sends money to the first user', () => {
    const myDescriptiveNote = 'Gift from Albert 02'
    cy.loginByApi() // login first

    //Get all users to find a receiver
    cy.getUsers().then((users) => {
      const firstUser = users[0]
      const receiverId = firstUser.id

      // Create a transaction to that user

      cy.createTransaction({
        amount: 50,
        note: myDescriptiveNote,
        senderId: 'W-Eeoicmg',
        receiverId: receiverId,
        type: 'payment',
      }).then((tx) => {
        cy.log('Transaction created with ID: ' + tx.id)
        expect(tx.receiverId).to.equal(receiverId)
      })
    })

    // Login via UI
    const signInPage = new SignInPage()
    signInPage.visit()

    //Login as default user
    signInPage.loginAs('Ashima', '12345')

    // Verify via UI
    cy.click_Tab('Mine')
    const transactionsPage = new TransactionsPage()
    transactionsPage.verifyTransaction(myDescriptiveNote)

    //For fun
    cy.click_MenuItem('Home')
    cy.click_MenuItem('My Account')
    cy.click_MenuItem('Bank Accounts')

  })
})



