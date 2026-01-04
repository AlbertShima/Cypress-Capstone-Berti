export class BasePage {
  protected get(selector: string) {
    return cy.get(selector)
  }
}
