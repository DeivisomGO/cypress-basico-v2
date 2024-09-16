Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName')
        .should('be.visible')
        .type('Deivisom', { delay: 0 })

    cy.get('#lastName')
          .should('be.visible')
          .type('Oliveira', { delay: 0 })

    cy.get('#email')
          .should('be.visible')
          .type('deivisom@outlook.com', { delay: 0 })

    cy.get('#open-text-area')
          .should('be.visible')
          .type('Teste', { delay: 0 }) 
        
    cy.contains('button', 'Enviar')
          .should('be.visible')
          .click()
})

Cypress.Commands.add('fillMandatoryFields', function(fieldsVals = {}) {
      const {
        firstName = 'Devisom',
        lastName= 'Oliveira',
        email = 'deivisom@exemplo.com',
        openText = 'Teste - Cypress Básico - Escola TAT'
      } = fieldsVals
      cy.get('#firstName').type(firstName)
      cy.get('#lastName').type(lastName)
      cy.get('#email').type(email)
      cy.get('#open-text-area').type(openText)
    })