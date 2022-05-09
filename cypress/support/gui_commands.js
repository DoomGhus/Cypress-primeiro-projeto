Cypress.Commands.add('login', (nome, senha) => {
    cy.get('input[formcontrolname="userName"]').type(nome);
    cy.get('input[formcontrolname="password"]').type(senha);
    cy.get('button[type="submit"]').click();
})

Cypress.Commands.add('loginSemClick', (nome, senha) => {
    cy.get('input[formcontrolname="userName"]').type(nome);
    cy.get('input[formcontrolname="password"]').type(senha);
})

Cypress.Commands.add('clicknologin', (clicknologin) => {
    var clicknologin = cy.contains('button[type="submit"]').click();
    return clicknologin(clicknologin);

})