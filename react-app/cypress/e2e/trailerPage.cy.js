describe("Trailer Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/trailer/361743");
  });

  it("Trailer Page can be opened", () => {
    cy.get("iframe");
  });

  it("Back arrow exist", () => {
    cy.get('[alt="back-arrow"]');
  });

  it("Click back arrow works", () => {
    cy.get('[alt="back-arrow"]').click();
  });
});
