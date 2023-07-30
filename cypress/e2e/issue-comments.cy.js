describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    it('Should create a comment successfully', () => {
        const comment = 'TEST_COMMENT';

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    });

    it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const comment = 'TEST_COMMENT_EDITED';

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', comment);
        });
    });

    it('Should delete a comment successfully', () => {
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .should('not.exist');
    });
});



    // TEST -Modify tests for covering comments functionality: ADD/UPDATE/DELETE

    describe('Issue comments creating, editing and deleting', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
                cy.visit(url + '/board');
                cy.contains('This is an issue of type: Task.').click();
            });
        });
    
        const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    

    // Add comment and assert that it is added and visible
    it.only('Should create a comment successfully', () => {

        const comment = 'MAARJA_COMMENT';
        const edited_comment = 'EDITED_MAARJA_COMMENT';
    

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...') .click();
            cy.get('textarea[placeholder="Add a comment..."]').type(comment);
            cy.contains('button', 'Save') .click() .should('not.exist');
            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);

    // Edit comment and assert that updated comment is visible
            cy.get('[data-testid="issue-comment"]').first().contains('Edit')
            .click().should('not.exist');
            cy.get('textarea[placeholder="Add a comment..."]').should('contain', comment)
            .clear().type(edited_comment);
            cy.contains('button', 'Save').click().should('not.exist');
            cy.get('[data-testid="issue-comment"]').should('contain', 'Edit').and('contain', edited_comment);

    // Delete comment and assert that comment is removed
            cy.get('[data-testid="issue-comment"]').contains('Delete').click();

            });

            cy.get('[data-testid="modal:confirm"]').contains('button', 'Delete comment')
            .click().should('not.exist');

            cy.get('[data-testid="modal:issue-details"]').contains(edited_comment).should('not.exist')

    });
});


