import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

dotenv.config() // load .env file

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    screenshotOnRunFailure: true
  },
  env: {
    apiUrl: process.env.CYPRESS_apiUrl,
    USER_LOGIN: process.env.CYPRESS_USER_LOGIN,
    USER_PASSWORD: process.env.CYPRESS_USER_PASSWORD,
  }
})
