 // cypress/support/utils.ts

/**
 * Build full API URL
 */
export function apiUrl(path = ''): string {
  const base = Cypress.env('apiUrl')
  const cleanBase = base.replace(/\/+$/, '')
  const cleanPath = path.replace(/^\/+/, '')
  return cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase
}

/**
 * Retry cy.request with backoff
 */
export function retryRequest<T>(
  options: Cypress.RequestOptions,
  retries = 3,
  delay = 500
): Cypress.Chainable<Cypress.Response<T>> {
  return cy.request({ ...options, failOnStatusCode: false }).then((response) => {
    if ([200, 201].includes(response.status)) {
      return response
    }

    if (retries <= 0) {
      throw new Error(
        `Request failed after retries: ${options.url} status=${response.status}`
      )
    }

    cy.wait(delay)
    return retryRequest(options, retries - 1, delay * 2)
  })
}

// ✅ Export for other files
export { retryRequest }