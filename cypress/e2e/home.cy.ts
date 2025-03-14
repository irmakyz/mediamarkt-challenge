import { expect } from "chai";

describe("Home Page", () => {
  it("should fetch and display a list of issues from the real API", () => {
    cy.visit("/");

    cy.get("[data-testid='loader']").should("be.visible");

    cy.get("[data-testid='issue-item']", { timeout: 10000 }).should(
      "have.length.greaterThan",
      0
    );
  });

  it("should send the correct search query in the API request", () => {
    cy.intercept("POST", "/graphql", (req) => {
      const queryText = req.body?.variables?.query || "";
      if (queryText.includes("bug")) {
        req.alias = "searchRequest";
      }
    });
    
    cy.visit("/");

    cy.get("[data-testid='search-input']").type("bug");
    cy.get("[data-testid='search-button']").click();

    cy.wait("@searchRequest").then((interception) => {
      expect(interception.request.body.variables.query).to.include("bug");
    });
    cy.get("[data-testid='issue-item']").should(
      "have.length.greaterThan",
      0
    );
  });

  it("should load more issues when clicking next page", () => {
    cy.intercept("POST", "/graphql").as("loadIssues");
    cy.visit("/");

    cy.wait("@loadIssues");

    cy.get("[data-testid='issue-item']").should("have.length.greaterThan", 0);

    cy.contains("button", "Next >").click();

    cy.wait("@loadIssues").then((interception) => {
      expect(interception.request.body.variables).to.have.property("after");
    });

    cy.get("[data-testid='issue-item']").should("have.length.greaterThan", 0);
  });
});
