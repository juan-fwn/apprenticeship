describe("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("HomeScreen can be opened", () => {
    cy.contains("Home");
  });

  it("Render Popular on Movy", () => {
    cy.contains("Popular on Movy");
  });

  it("Render Most Viewed", () => {
    cy.contains("Most Viewed");
  });

  it("Render Recommended movies", () => {
    cy.contains("Recommended movies");
  });

  it("Render Footer", () => {
    cy.contains("Questions? Call +1 (408) 600-1722 (USA)");
  });
});
