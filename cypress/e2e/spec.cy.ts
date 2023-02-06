describe('Tests suite', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('HOST'))
  })

  it('Should show form errors', () => {

    cy.contains('Search').click()

    cy.url().should('eq', Cypress.env('HOST'))

    cy.get('#search-address-error')
      .should('include.text', 'Please enter a valid Street name.').and('be.visible')
  })

  it('Should load weather data in 14 items', () => {

    cy.get('#street-address').type('4600 SILVER HILL RD')
    cy.get('#city').type('Washigton')
    cy.get('#region').type('DC')
    cy.get('#postal-code').type('20233')
    
    cy.contains('Search').click()

    cy.get('#weather-data > li').should('have.length', 14)
    
  })

  it('Should show an error with an address outside the US', () => {

    cy.get('#street-address').type('4600 SILVER HILL RD')
    cy.get('#city').type('Barranquilla')
    cy.get('#region').type('AT')
    cy.get('#postal-code').type('020002')
    
    cy.contains('Search').click()

    cy.get('#search-address-error')
      .should('include.text', 'Coordinates were not found for the given address')
      .and('be.visible')    
  })
})

export {}