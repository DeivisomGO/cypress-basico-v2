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