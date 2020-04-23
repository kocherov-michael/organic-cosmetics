import DefaultPage from './DefaultPage.js'

export default class LoginPage extends DefaultPage {
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
            // если не получили данные, то дальше не выполняем
            if (!data) return
            DefaultPage.postData('request.php', data)
            const account = JSON.parse(localStorage.getItem('account')) || {}
            // проверяем пароль и почту на совпадения
            if (account.email === data.email && account.password === data.password) {
                // если всё совпадает
                infoMainElement.innerHTML= ''
                titleElement.innerHTML= 'Sussess'
                subtitleElement.innerHTML= 'Login to your profile was successful'
                account.status = 'login'
                localStorage.setItem('account', JSON.stringify(account))
            } else {
                // если пароль не совпал, так и пишем в карточке
                infoMainElement.innerHTML= ''
                // делаем заголовок красным
                titleElement.classList.add('info-card__title--fail')
                // заменяем текст в информационной карточке
                titleElement.innerHTML= 'Fail'
                subtitleElement.innerHTML= 'the password is not correct'
                // ссылка теперь ведёт на страницу логина
                infoButtonElement.setAttribute('href', 'login.html')
            }
        })
    }
}