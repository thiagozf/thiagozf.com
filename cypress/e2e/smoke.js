describe('app', () => {
  it('works', () => {
    cy.visit('/')
    cy.wait(500)
    cy.findAllByRole('link', {name: /blog/i})
  })
})
