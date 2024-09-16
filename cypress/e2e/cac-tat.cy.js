/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    const Three_Sec = 3000
    beforeEach(() => {
        cy.visit('./src/index.html')
    });
    it('Verificar o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Verificar campos, preencher os campos obrigatórios e enviar o formulário', () => {
        const longText = 'A ligeira raposa marrom ataca o cão preguiçoso. The quick brown fox jumps over the lazy dog. La ligera zorra marrón ataca al perezoso perro.'

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
          .type(longText, { delay: 0 }) 
        
        cy.get('button[type="submit"]')
          .should('be.visible')
          .click()

        cy.get('.success')
          .should('be.visible')
    });

    it('Exibir mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', () => {
        cy.get('#firstName')
          .should('be.visible')
          .type('Deivisom', { delay: 0 })

        cy.get('#lastName')
          .should('be.visible')
          .type('Oliveira', { delay: 0 })

        cy.get('#email')
          .should('be.visible')
          .type('deivisom@outlook,com', { delay: 0 })

        cy.get('#open-text-area')
          .should('be.visible')
          .type('Teste', { delay: 0 }) 
        
        cy.get('button[type="submit"]')
          .should('be.visible')
          .click()
        
        cy.get('.error')
          .should('be.visible')
    });

    it('Validar que o campo de telefone só deve aceitar números', () => {
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '')
    });

    it('Exibir mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName')
          .should('be.visible')
          .type('Deivisom', { delay: 0 })

        cy.get('#lastName')
          .should('be.visible')
          .type('Oliveira', { delay: 0 })

        cy.get('#email')
          .should('be.visible')
          .type('deivisom@outlook.com', { delay: 0 })

        cy.get('#phone-checkbox')
          .should('be.visible')
          .check()

        cy.get('#open-text-area')
          .should('be.visible')
          .type('Teste', { delay: 0 }) 
        
        cy.get('button[type="submit"]')
          .should('be.visible')
          .click()
        
        cy.get('.error')
          .should('be.visible')
    });

    it('Preencher e limpar os campos nome, sobrenome, e-mail e telefone', () => {
      cy.get('#firstName')
        .should('be.visible')
        .type('Deivisom', { delay: 0 })
        .should('have.value', 'Deivisom')
        .clear()
        .should('have.value', '')

      cy.get('#lastName')
        .should('be.visible')
        .type('Oliveira', { delay: 0 })
        .should('have.value', 'Oliveira')
        .clear()
        .should('have.value', '')

      cy.get('#email')
        .should('be.visible')
        .type('deivisom@outlook.com', { delay: 0 })
        .should('have.value', 'deivisom@outlook.com')
        .clear()
        .should('have.value', '')

      cy.get('#phone')
        .should('be.visible')
        .type('15991841771', { delay: 0 })
        .should('have.value', '15991841771')
        .clear()
        .should('have.value', '')
    });

    it('Exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.get('button[type="submit"]')
          .should('be.visible')
          .click()
        
      cy.get('.error')
          .should('be.visible')
    });

    it('Enviar o formuário com sucesso usando um comando customizado', () => {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success')
          .should('be.visible')
    });

    it('Selecionar um produto (YouTube) por seu texto', () => {
      cy.get('#product')
        .should('be.visible')
        .select('YouTube')
        .should('have.value', 'youtube')
    });

    it('Selecionar um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product')
        .should('be.visible')
        .select('mentoria')
        .should('have.value', 'mentoria')
    });

    it('Selecionar um produto (Blog) por seu índice', () => {
      cy.get('#product')
        .should('be.visible')
        .select(1)
        .should('have.value', 'blog')
    });

    it('Selecionar o tipo de atendimento "Feedback" ', () => {
      cy.get('input[type="radio"][value="feedback"]')
        .should('be.visible')
        .check()
        .should('have.value', 'feedback')
    });

    it('Selecionar cada tipo de atendimento', () => {
      cy.get('input[type="radio"]')
        .should('be.visible')
        .each(function($radio){
          cy.wrap($radio).check().should('be.checked')
        })
    });

    it('Marcar ambos checkboxes, depois desmarcar o último', () => {
      cy.get('input[type="checkbox"]')
        .should('be.visible')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
    });

    it('Selecionar um arquivo da pasta fixtures', () => {
      cy.get('#file-upload')
        .should('be.visible')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
          expect($input[0].files[0].name).equal('example.json')
        }) 
    });

    it('Selecionar um arquivo simulando um drag-and-drop', () => {
      cy.get('#file-upload')
        .should('be.visible')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: "drag-drop" })
        .should(function($input) {
          expect($input[0].files[0].name).equal('example.json')
        })
    });

    it('Selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('sampleFile')
      cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).equal('example.json')
        })
    });

    it('Verificar que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.get('#privacy a').should('have.attr', 'target', "_blank")
    });

    it('Acessar a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
      
      cy.contains('CAC TAT - Política de privacidade')
        .should('be.visible')
    });

    it('Testar a página da política de privacidade de forma independente', () => {
      cy.visit('./src/privacy.html')
      cy.contains('CAC TAT - Política de privacidade')
        .should('be.visible')
    });
});