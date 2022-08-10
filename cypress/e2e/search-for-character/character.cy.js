/// <reference types="cypress" />

const { get } = require("core-js/core/dict")
const { resolve } = require("core-js/fn/promise")

describe('validate starwars characters', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('can search starwars characters via UI Testing', () => {
    cy.get("#people")
    .should('be.checked')

    cy.get("#query")
    .type("Luke Skywalker")

    cy.xpath("//button[contains (text(), 'Search')]")
    .click()

    cy.xpath("//div[contains (text(), 'male')]")
    .should('be.visible')
  })

  it('can search starwars characters via API', () => {
    cy.request({
      method : 'GET',
      url : 'https://swapi.dev/api/people/4/',
      headers : {
        'content-type' : 'application/json'
      }
      
    }).then((response)=>{
      console.log(response)
      expect(response).property('status').to.equal(200)
      expect(response.body.name).to.equal('Darth Vader')
      expect(response.body.height).to.equal("202")
      })
  })
  it('has a response for an invalid character search', ()=>{
    cy.get("#people")
    .click()
    .should('be.checked')

    cy.get("#query")
    .type("Pietje Puk")

    cy.xpath("//button[contains (text(), 'Search')]")
    .click()

    cy.xpath("//div[contains (text(), 'Not found.')]")
    .should('be.visible')
  })
})  