import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'
import {customer,provider, appointment} from '../support/factories/dash'

describe('dashboard', function(){
    context('quando o cliente faz um agendamento no app mobile',function(){

           

        before(function(){
            cy.postUser(provider)
            cy.postUser(customer)
            //
            cy.apiLogin(customer)
            cy.log('token : '+Cypress.env('apiToken'))
            cy.setProviderId( provider.email) 
            cy.createAppointment(appointment.hour);  
        })

        it('o mesmo deve ser exibido no dashboard', function(){
            // cy.log('O id do Ramon é '+Cypress.env('providerId'))
            loginPage.go()
            loginPage.form(provider)
            loginPage.submit()
            dashPage.calendarShoudBeVisible()
            const day = Cypress.env('appointmentDay')
            dashPage.selectDay(day)   
            dashPage.appointmentShouldBe(customer, appointment.hour) 
          
        })
    })

})

