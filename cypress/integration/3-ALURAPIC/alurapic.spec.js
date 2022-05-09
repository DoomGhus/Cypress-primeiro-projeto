
describe('Login e registro de usuario alura pic', () => {

    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com')
    })

    it('verifica mensagens validacao tela de login', () => {
        cy.contains('button', 'login').click();
        //cy.get('.btn')
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
    })

    it('verifica mensagens validacao no cadastro', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
    })

    it('verifica mensagem no  de email invalido', () => {
        cy.contains('a', 'Register now').click();
        cy.get('input[formcontrolname="email"]').type('gustavo');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
    })

    it('verifica mensagens de Minimum length is 2', () => {
        cy.contains('a', 'Register now').click();
        cy.get('input[formcontrolname="fullName"]').type('a');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
    })

    it('verifica mensagens de deve ser minusculo e minimum length', () => {
        cy.contains('a', 'Register now').click();
        cy.get('input[formcontrolname="userName"]').type('A');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');

    })

    it('fazer login de usuario valido', () => {
        cy.login('flavio', '123');
        cy.contains('a', '(Logout)').should('be.visible');
    })


    it('fazer login de usuario invalido', () => {
        cy.login('gustavo', '123');
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password')
        })
    })


    it('password required  deve ficar visivel', () => {
        cy.get('input[formcontrolname="userName"]').type('gustavo');
        cy.get('input[formcontrolname="password"]').focus();
        cy.contains('ap-vmessage', 'Password is required').should('be.visible');

    })


    const usuarios = require ('../../fixtures/usuarios.json'); // importando o projeto da pasta fixture

    usuarios.forEach(usuario => { //para cada usuario

        it.only(`regista novo usuario ${usuario.userName}`, () => {
            cy.contains('a', 'Register now').click();
            cy.get('input[formcontrolname="email"]').type(usuario.email);
            cy.get('input[formcontrolname="fullName"]').type(usuario.fullName);
            cy.get('input[formcontrolname="userName"]').type(usuario.userName);
            cy.get('input[formcontrolname="password"]').type(usuario.password);
            cy.contains('button', 'Register').click();


        })

        /*it('password required  nao deve ficar visivel', () => {
            cy.login('gustavo', '123')
            cy.contains('ap-vmessage', 'Password is required').not('..')
        })*/
    });



})
