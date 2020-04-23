import DefaultPage from './DefaultPage.js'

export default class RegistrationPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        // this.formSubmit()
        this.checkIsLogin()
        this.fillProfileFields()
        this.listenEditButton()
        this.logoutListener()
    }

    // проверяем залогинен ли пользователь
    checkIsLogin() {
        const account = JSON.parse(localStorage.getItem('account')) || {}
        if (!account.status || account.status !== 'login') {
            window.location.replace('login.html')
        }
    }

    // заполнить поля данными пользователя
    fillProfileFields() {
        const account = JSON.parse(localStorage.getItem('account')) || {}

        const formElement = document.querySelector('[data-form]')
        const inputList = formElement.querySelectorAll('[data-form-input]')

        // заполняем поля инпутов данными из профиля пользователя
        inputList.forEach( input => {
            input.value = account[input.getAttribute('name')]
        })

    }

    listenEditButton() {
        const formElement = document.querySelector('[data-form]')
        const inputList = formElement.querySelectorAll('[data-form-input]')
        const infoMainElement = document.querySelector('[data-info-main]')
        const titleElement = document.querySelector('[data-info-title]')
        const subtitleElement = document.querySelector('[data-info-subtitle]')
        const infoButtonElement = document.querySelector('[data-info-card-button]')
        let isEdit = false

        formElement.addEventListener('submit', event => {
            event.preventDefault()
            // если в режиме редактирования, то редактируем
            if (isEdit) {
                const data = super.collectInputValues(event) 
                // если не получили данные, то дальше не выполняем
                if (!data) return
                DefaultPage.postData('request.php', data)
                data.status = 'login'
                // сохраняем данные в память
                localStorage.setItem('account', JSON.stringify(data))

                infoMainElement.innerHTML= ''
                // заменяем текст в информационной карточке
                titleElement.innerHTML= 'Success'
                subtitleElement.innerHTML= 'Your profile was edited successfully'
                // ссылка теперь ведёт на страницу профайла
                infoButtonElement.setAttribute('href', 'profile.html')
            } else {
                // если ещё не редактируем, то пора начинать
                this.startEdit(inputList)
                isEdit = true
            }
        })
    }

    // начать редактирование
    startEdit(inputList) {
        const buttonElement = document.querySelector('[data-submit-button]')
        inputList.forEach( input => {
            input.removeAttribute('readonly')
            input.classList.remove('input--readonly')
            input.classList.add('input--focused')
        })
        buttonElement.innerHTML = 'SAVE'
    }

    // прослушка выхода из профиля
    logoutListener() {
        const logOutButton = document.querySelector('[data-logout-button]')
        logOutButton.addEventListener('click', () => {
            const data = JSON.parse(localStorage.getItem('account'))
            // сохраняем информацию, что вышли из профиля
            data.status = 'logout'
            localStorage.setItem('account', JSON.stringify(data))
        })
    }

}