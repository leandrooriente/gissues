const baseUrl = Cypress.config().baseUrl;

it("Search for issues", () => {
  cy.visit("/");
  cy.get('[data-test-id="organization-search-input"]').type("leandrooriente");
  cy.get('[data-test-id="repository-search-input"]').type("gissues-e2e-issues");
  cy.get('[data-test-id="search-button"]').click();
  cy.url().should("eq", `${baseUrl}leandrooriente/gissues-e2e-issues/1`);
  cy.get('[data-test-id="result-list"]').children().should("have.length", 5);

  cy.get('[data-test-id="next-page-link"]').click();
  cy.url().should("eq", `${baseUrl}leandrooriente/gissues-e2e-issues/2`);
  cy.get('[data-test-id="result-list"]').children().should("have.length", 1);

  cy.get('[data-test-id="previous-page-link"]').click();
  cy.url().should("eq", `${baseUrl}leandrooriente/gissues-e2e-issues/1`);
  cy.get('[data-test-id="result-list"]').children().should("have.length", 5);

  cy.get('[data-test-id="logo-home-link"]').click();
  cy.url().should("eq", baseUrl);
});

it("Returns a not found page if issues are not available", () => {
  cy.visit("/");
  cy.get('[data-test-id="organization-search-input"]').type("leandrooriente");
  cy.get('[data-test-id="repository-search-input"]').type(
    "gissues-non-existing"
  );
  cy.get('[data-test-id="search-button"]').click();

  cy.get('[data-test-id="not-found-page"]').should("be.visible");
});
