import DefaultPage from './DefaultPage.js'

export default class OrderPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        // this.orderCartArr = this.cart
        this.orderCartArr = JSON.parse(localStorage.getItem('order'))
        // console.log(this.cart.length)
        this.fillOrderAside()
        // this.hideCartIcon()
        this.fillCartCard()
        this.showTotalSumm()
        this.formSubmit()
        this.fillInputsUsersData()
    }
    // заполнить поля формы данными пользователя
    fillInputsUsersData() {
        // console.log(this.userData)
        // если пользователь залогинен
        if (this.userData.status === 'login') {
            const formElement = document.querySelector('[data-form]')
            const inputList = formElement.querySelectorAll('[data-form-input]')
            // заполняем поля инпутов данными из профиля пользователя
            inputList.forEach( input => {
                input.value = this.userData[input.getAttribute('name')]
            })
        }
    }

    // заполнить aside на странице order
    fillOrderAside() {
        const orderAsideElement = document.querySelector('[data-order-aside]')
        let innerElement = ''

        for ( let i = 0; i < this.orderCartArr.length; i++ ) {
            for ( let j = 0; j < this.goodsArr.length; j++ ) {
                if (this.orderCartArr[i].id == this.goodsArr[j].id) {
                    innerElement +=
                    `<div class="cart-thumb">
                        <div class="cart-thumb__main"><img class="cart-thumb__img" src="./assets/img/goods/${this.goodsArr[j].src}" data-cart-thumb-card-img="">
                        <div class="cart-thumb__desc"><a class="cart-thumb__title" href="product.html?id=${this.goodsArr[j].id}">${this.goodsArr[j].name}</a>
                            
                            <div class="card-thumb__price">${this.goodsArr[j].price}&nbsp;${this.currency}</div>
                            <div class="card-thumb__info">${this.goodsArr[j].value}, ${this.goodsArr[j].skin}</div>
                        </div>
                        </div>
                        <div class="cart-thumb__bottom">
                        <div class="cart-thumb__count">${this.orderCartArr[i].quantity}</div>
                        </div>
                    </div>`
                }
            }
        }

        orderAsideElement.innerHTML = innerElement
    }

    // показать итоговую сумму за заказ
    showTotalSumm() {
        // console.log('show')
        super.showTotalSumm(this.orderCartArr)
        // указать сколько товаров в заказе
        const itemsCountElement = document.querySelector('[data-order-cart-length]')
        itemsCountElement.innerHTML = this.cart.length
    }

    // на странице заказа корзину скрываем
    fillCartCard() {
        document.querySelector('[data-cart-icon]').style="display: none;"
    }

    // отправка заявки
    formSubmit() {
        super.formSubmit()
        // очищаем корзину
        localStorage.setItem('cart', JSON.stringify([]))
    }
}