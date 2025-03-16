describe("Issue Detail Page", () => {
  const issueNumber = 16873;

  beforeEach(() => {
    cy.intercept("POST", "/graphql").as("graphqlRequest");
    cy.visit(`/issue/${issueNumber}`);
  });

    it("should display issue details correctly", () => {
      cy.get("[data-testid='issue-title']")
        .should("be.visible")
        .and("contain.text", `#${issueNumber}`);

      cy.get("[data-testid='issue-state']").should("exist");

      cy.get("[data-testid='detail-item-avatar']").should("be.visible");

      cy.get("[data-testid='detail-item']").should("exist");
    });

    it("should display comments on initial load", () => {
      cy.get("[data-testid='detail-item']").should("have.length.greaterThan", 1);
    });

    it("should load more comments when 'Load More' is clicked", () => {
      cy.get("[data-testid='load-more-button']")
        .trigger("mousedown")
        .click()
        .trigger("mouseup");
      cy.wait("@graphqlRequest");
      cy.get("[data-testid='detail-item']").should("have.length.greaterThan", 24);
    });

      it("should remove 'Load More' button when no more comments are available", () => {
          cy.visit("/issue/23226");

        cy.get("[data-testid='load-more-button']").click();
        cy.wait("@graphqlRequest");
        cy.get("[data-testid='load-more-button']").should("not.exist");
    });

  it("should display an error message when API request fails", () => {
    cy.visit("/issue/23226");
    cy.intercept("POST", "/graphql", (req) => {
      req.reply({
        statusCode: 500,
        body: {
          errors: [{ message: "Internal Server Error" }],
        },
      });
    }).as("apiError");

    cy.get("[data-testid='load-more-button']").click();
    cy.wait(10000);
    cy.wait("@apiError");

    cy.get("[data-testid='error-message']").should("be.visible");
  });
});
