  /// <reference types="Cypress"/>
export default class Notifications {
	visit() {
		cy.visit('http://localhost:3000/notifications')
	}
    getNotificationsAmount(){
		return cy.get('[data-test="notifications-list"] > li').its('length')
    }
    getNotificationIconAmount(){
        return cy.get('[data-test="nav-top-notifications-count"]').find('span').invoke('text')
    }
	getMessage(which){
		return cy.get('[data-test="notifications-list"] > li').eq(which)
	}
    getMessageText(which){
        return this.getMessage(which).find('span').invoke('text')
    }
	dissmisMessage(id) {
		return this.getMessage(id).find('button').click()
	}
}
