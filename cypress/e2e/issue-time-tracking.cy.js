

describe('Issue create Time tracking functionality', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
    });


    const title = 'Issue Time tracking'
    const description = 'Issue Time tracking description'
    const time_spent = '2'
    const time_remaining = '5'
  
    it('Issue create Time tracking', () => {
      cy.get('[data-testid="modal:issue-create"]').within(() => {
  
        cy.get('[data-testid="select:type"]').click();
        cy.get('[data-testid="select-option:Bug"]')
          .trigger('click');
  
        cy.get('.ql-editor').type(description);
        cy.get('input[name="title"]').type(title);
        cy.get('[data-testid="select:userIds"]').click();
        cy.get('[data-testid="select-option:Pickle Rick"]').click();

        cy.get('button[type="submit"]').click();

    //Assert that new issue is created
        cy.get('[data-testid="modal:issue-create"]').should('not.exist');
        cy.wait(15000);
    });

    //Should add, edit and remove estimation
         cy.get('[data-testid="list-issue"]');
         cy.contains(title).click();
         cy.get('[data-testid="modal:issue-details"]');
         cy.contains('No time logged').should('be.visible');
         cy.get('[placeholder="Number"]').type(10);
         cy.contains('10h estimated').should('be.visible');
         cy.get('[data-testid="icon:close"]').first().click();

    //Should reopen the same issue to check that original estimation is saved
        cy.get('[data-testid="list-issue"]').contains(title).click();
        cy.contains('10h estimated').should('be.visible');

    //Should update estimation
        cy.get('[placeholder="Number"]').clear().type(20);
        cy.contains('20h estimated').should('be.visible');
        cy.get('[data-testid="icon:close"]').first().click();
        
    //Should reopen the same issue to check that original estimation is saved
        cy.get('[data-testid="list-issue"]').contains(title).click();
        cy.contains('20h estimated').should('be.visible');

    //Should remove estimation
        cy.get('[placeholder="Number"]').clear().type(20);
        cy.contains('No time logged').should('be.visible');
        cy.get('[data-testid="icon:close"]').first().click();

    //Should reopen the same issue to check that estimation is removed
        cy.get('[data-testid="list-issue"]').contains(title).click();
        cy.contains('No time logged').should('be.visible');

    //Time Logging Functionality
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.get('[placeholder="Number"]').eq(1).type(time_spent);
        cy.get('[placeholder="Number"]').eq(2).type(time_remaining);
        cy.get('[data-testid="modal:tracking"]').contains('Done').click().should('not.exist');
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');

    
     });
});






