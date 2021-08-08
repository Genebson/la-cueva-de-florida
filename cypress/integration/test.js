const URL = 'http://127.0.0.1:5500/'

context('Conversor de Divisas', () => {
  before(() => {
    cy.visit(URL)
  })

  describe('Chequea que los inputs fallen', () => {
    it('Convierte sin ingresar datos en los inputs', () => {
      cy.get('.input-importe').should('be.empty')
      cy.get('.input-a-importe').should('be.empty')
      cy.get('.btn-convertir').click()
      cy.get('.imagen-error').should('be.visible')
      cy.visit(URL)
    })

    it('Chequea que el input de monedas falle', () => {
      cy.get('.input-a-importe').type('4321')
      cy.get('.input-importe').should('be.empty')
      cy.get('.imagen-error').should('not.be.visible')
      cy.visit(URL)
    })
  })

  describe('Chequea que los inputs funcionen', () => {
    it('Convierte ingresando valores correctos', () => {
      cy.visit(URL)
      cy.get('.input-importe').type('1234')
      cy.get('.input-a-importe').click().get('.currency-selected-a').then((moneda) => {
        moneda[0].click()
      })
      cy.get('.btn-convertir').click()
      cy.get('.imagen-error').should('not.be.visible')
    })
  })
})