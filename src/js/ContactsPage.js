import DefaultPage from './DefaultPage.js'

export default class ContactsPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        this.formSubmit()
    }

    // отправка сообщения
    formSubmit() {
        super.formSubmit()
        // заменяем текст в карточке успеха
        const infoMainElement = document.querySelector('[data-info-main]')
        const subtitleElement = document.querySelector('[data-info-subtitle]')
        infoMainElement.innerHTML= ''
        subtitleElement.innerHTML= 'Your message has been sent'
    }
}