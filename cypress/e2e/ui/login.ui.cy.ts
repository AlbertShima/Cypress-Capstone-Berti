import { SignInPage } from '@pages/signInPage'

describe('RWA API - Login', () => {
  it('logs in successfully via UI with default user', () => {
    const signInPage = new SignInPage()

    //Go to sign in page
    signInPage.visit()   
    
    //Login as default user
    signInPage.loginAs('Ashima', '12345')
  })
})
