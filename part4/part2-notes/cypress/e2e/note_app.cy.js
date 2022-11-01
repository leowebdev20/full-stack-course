describe("Note app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2022"
    );
  });

  // it("user can log in", function () {
  //   cy.contains("login").click();
  //   cy.get("#username").type("mluukkai");
  //   cy.get("#password").type("salainen");
  //   cy.get("#login-button").click();

  //   cy.contains("Matti Luukkainen logged in");
  // });
});
