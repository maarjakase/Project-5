 //Test 1 - Delete issue and validate it successfully
describe('Issue delation', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();

        // Assert that the issue detail view modal is visible
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
      });
    });
  
    
    it('Delete issue and validate successfully', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {

            cy.get('[data-testid="icon:trash"]').click();
        });

        cy.get('[data-testid="modal:confirm"]').should('be.visible');        
        cy.contains('Delete issue').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.contains('This is an issue of type: Task.').click().should('not.exist');
        
    
        })
    });


    //Test 2 - Starting the deleting issue process, but cancelling this action
    describe('Issue delation', () => {
        beforeEach(() => {
          cy.visit('/');
          cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('Click on an issue to see').click();
            cy.get('[data-testid="modal:issue-details"]').should('be.visible');
          });
        });
    
    it.only('Deleting issue with cancelling this action', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {

            cy.get('[data-testid="icon:trash"]').click();
        });

        cy.get('[data-testid="modal:confirm"]').should('be.visible'); 
        cy.contains('Cancel').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.get('[data-testid="icon:close"]').first().click();
        cy.contains('Click on an issue to see').click().should('exist');

    })
});
