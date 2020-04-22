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
        this.orderSubmit()
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
                            
                            <div class="card-thumb__price">${this.goodsArr[j].price} $</div>
                            <div class="card-thumb__info">${this.goodsArr[j].value}, Skin type: ${this.goodsArr[j].skin}</div>
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
    orderSubmit() {
        const formElement = document.querySelector('[data-order]')
        const submitElement = formElement.querySelector('[data-order-submit]')
        const inputList = formElement.querySelectorAll('[data-order-input]')

        formElement.addEventListener('submit', (event) => {
            event.preventDefault()
            let allCorrect = true
            // создаём объект, который отправим на заказ
            const data = [{order: this.orderCartArr}]

            // собираем данные из инпутов
            inputList.forEach((input) => {
                
                if(input.value.trim()) {
                    data.push({[input.name]: input.value.trim()})
                } else {
                    allCorrect = false
                    input.classList.add('input--danger')
                    setTimeout(() => {
                        input.classList.remove('input--danger')
                    }, 1000)
                }

            })
            // return
            if (allCorrect) {
                super.showPopUp('.info-card-wrapper', 500)
                DefaultPage.postData('http://organics-myshop.org/order', data)
                localStorage.setItem('cart', JSON.stringify([]))
            }
        })
    }
}