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
  
    it.only('Should create an issue and validate it successfully', () => {
        //System finds modal for creating issue and does next steps inside of it
        cy.get('[data-testid="modal:issue-create"]').within(() => {
    
          //open issue type dropdown and choose Story
          cy.get('[data-testid="select:type"]').click();
          cy.get('[data-testid="select-option:Story"]')
            .trigger('click');
    
    
    
    
        });
    });
});