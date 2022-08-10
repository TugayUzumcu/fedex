/// <reference types="cypress" />

const { get } = require("core-js/core/dict")
const { resolve } = require("core-js/fn/promise")

describe('validate starwars planets', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('can search starwars planets via UI Testing', () => {
    cy.get("#planets")
    .click()
    .should('be.checked')

    cy.get("#query")
    .type("Alderaan")

    cy.xpath("//button[contains (text(), 'Search')]")
    .click()

    cy.xpath("//div[contains (text(), 'temperate')]")
    .should('be.visible')
  })

  it('can search starwars planets via API', () => {
    cy.request({
      method : 'GET',
      url : 'https://swapi.dev/api/planets/2/',
      headers : {
        'content-type' : 'application/json'
      }
      
    }).then((response)=>{
      console.log(response)
      expect(response).property('status').to.equal(200)
      expect(response.body.name).to.equal('Alderaan')
      expect(response.body.population).to.equal("2000000000")
      })
  })
})  