import DefaultPage from './DefaultPage.js'

export default class RegistrationPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        this.formSubmit()
    }

    // логин в профиль
    formSubmit() { 
        
        const infoMainElement = document.querySelector('[data-info-main]')
        const titleElement = document.querySelector('[data-info-title]')
        const subtitleElement = document.querySelector('[data-info-subtitle]')
        const infoButtonElement = document.querySelector('[data-info-card-button]')

        const formElement = document.querySelector('[data-form]')
        formElement.addEventListener('submit', (event) => {
            const data = super.collectInputValues(event)
            console.log(data)

            // если не получили данные, то дальше не выполняем
            if (!data) return
            DefaultPage.postData('request.php', data)
            data.status = 'login'
            // сохраняем данные в память
            localStorage.setItem('account', JSON.stringify(data))

            infoMainElement.innerHTML= ''
            // заменяем текст в информационной карточке
            titleElement.innerHTML= 'Success'
            subtitleElement.innerHTML= 'Registration was successful'
        })
    }
}