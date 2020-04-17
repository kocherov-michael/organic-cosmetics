import {goodsArr} from './goods.js'
// import {quantityInput} from '../blocks/quantity-input/quantity-input.js'
import DefaultPage from './DefaultPage.js'

export default class CartPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        // this.goodsArr = goodsArr[0]
        // this.cart = JSON.parse(localStorage.getItem('cart')) || []
        // super.showCartLength()
        // super.fillCartCard()
        // this.fillCartPage()
        this.cartCardIsRefreshed = false
        this.cartPageIsRefreshed = false
        
        // super.listenAddCartButton()
    }

    // заполняем страницу корзины товарами
    fillCartPage() {
        const goodsContainerElement = document.querySelector('[data-cart-goods-container]')
        goodsContainerElement.innerHTML =
        `<div class="cart-empty">
        <div class="cart-empty__icon">
          <div class="zmdi zmdi-alert-circle"></div>
        </div>
        <div class="cart-empty__notification">There are no more items in your cart</div>
      </div>`
        let innerElement = ''

        // console.log(this.cart)
        // console.log(this.goodsArr)
        for ( let i = 0; i < this.cart.length; i++ ) {
            for ( let j = 0; j < this.goodsArr.length; j++ ) {
                if (this.cart[i].id == this.goodsArr[j].id) {

                    innerElement +=
                    `<div class="cart-goods__item">
                        <div class="cart-item container" data-cart-item>
                            <div class="row">
                                <div class="cart-item__close col-1">
                                    <div class="cart-item__close-icon" data-cart-item-remove="${this.cart[i].id}"><i class="zmdi zmdi-close"></i></div>
                                </div>
                                <div class="cart-item__picture col-4 col-sm-5 col-md-2">
                                    <img class="cart-item__img" src="./assets/img/goods/${this.goodsArr[j].src}" data-cart-thumb-card-img=""></div>
                                <div class="cart-item__title col-6 col-md-3"><a class="cart-item__link" href="product.html">${this.goodsArr[j].name}</a>
                                <div class="cart-item__info">${this.goodsArr[j].value}, Skin type: ${this.goodsArr[j].skin}</div>
                                </div>
                                <div class="cart-item__price col-3 col-sm-6 col-md-2" data-price="${this.goodsArr[j].price}">$${this.goodsArr[j].price}</div>
                                <div class="cart-item__input col-6 col-sm-3 col-md-2">
                                <div class="quantity-input quantity-input--blue" data-quantity-input="">
                                    <input class="quantity-input__field" value="${this.cart[i].quantity}" data-input-value="${this.cart[i].id}">
                                    <div class="quantity-input__plus" data-input-plus="">+</div>
                                    <div class="quantity-input__minus" data-input-minus="">-</div>
                                </div>
                                </div>
                                <div class="cart-item__total col-3 col-md-2">$<span data-item-summ>0</span></div>
                            </div>
                        </div>
                    </div>`
                }
            }

        }
        if (innerElement) {

            goodsContainerElement.innerHTML = innerElement
        }
        this.listenCartPageRemove()
        super.quantityInput(this.saveInputValues.bind(this))
        this.quantityInputListener()
        this.showItemSumm()
        
        // console.log('cart page')
        this.cartPageIsRefreshed = true
        this.fillCartCard()
    }

    // обновление карточки корзины и впридачу страницы, если она ещё не обновлена
    fillCartCard() {
        // если карточка и страница обновлены, то возврат
        if (this.cartCardIsRefreshed && this.cartPageIsRefreshed) {
            this.cartCardIsRefreshed = false
            this.cartPageIsRefreshed = false
            return
        }
        // если все карточка корзины не обновлена, то обновляем
        if (!this.cartCardIsRefreshed) {
            // говорим, что обновлены
            // console.log('card')
            this.cartCardIsRefreshed = true
            super.fillCartCard()
        }
        if (!this.cartPageIsRefreshed) {
            // console.log('cart')
            this.cartPageIsRefreshed = true
            this.fillCartPage()
        }

    }

    // слушаем нажатия на крестик удаления товара со страницы корзины
    listenCartPageRemove() {
        const removeCartItemList = document.querySelectorAll('[data-cart-item-remove]')
        for ( let i = 0; i < removeCartItemList.length; i++ ) {
            removeCartItemList[i].addEventListener('click', () => {
                const idRemove = removeCartItemList[i].getAttribute('data-cart-item-remove')
                // console.log(idRemove)
                this.removeFromCart(idRemove)
                this.fillCartCard()
                this.showCartLength()
                this.fillCartPage()
            })
        }
    }

    // прослушка изменения инпута
    quantityInputListener() {
        // console.log(this.cart)
        const inputList = document.querySelectorAll('[data-input-value]')
        for (let i = 0; i < inputList.length; i++) {
            // console.log(inputList[i].value)
            inputList[i].addEventListener('input', () => {
                // console.log(inputList[i])
                
                this.saveInputValues(inputList[i])
            })
        }
        
    }

    // изменяем количество товара в зависимости от изменения инпута
    saveInputValues(inputElement) {
        
        const id = inputElement.getAttribute('data-input-value')
        const value = inputElement.value
        
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].id == id) {
                this.cart[i].quantity = value
                // сохраняем в память
                localStorage.setItem('cart', JSON.stringify(this.cart))
                this.showItemSumm()
                // this.showTotalSumm()
                this.fillCartCard()
            }
        }
    }

    // считаем сумму одного товара в зависимости от количества
    showItemSumm() {
        const itemElement = document.querySelectorAll('[data-cart-item]')
        // console.log(itemElement)
        for (let i = 0; i < itemElement.length; i++) {
            const price = itemElement[i].querySelector('[data-price]').getAttribute('data-price')
            const count = itemElement[i].querySelector('[data-input-value]').value
            // console.log(price, count)
            itemElement[i].querySelector('[data-item-summ]').textContent = Math.round(price * count * 100) / 100
        }
    }

    // // считаем общую сумму
    // showTotalSumm() {
    //     let summ = 0
    //     for (let i = 0; i < this.cart.length; i++) {
    //         summ += Math.round(this.cart[i].price * this.cart[i].quantity * 100) / 100
    //     }
    //     console.log( Math.round(summ * 100) / 100 )
    //     summ = Math.round(summ * 100) / 100
    //     // выводим сумму в общий счёт
    //     document.querySelectorAll('[data-amount-summ]').forEach((elem) => {
    //         elem.textContent = summ
    //     })
    //     // считаем значение налога 5%
    //     document.querySelectorAll('[data-amount-tax]').forEach((elem) => {
    //         elem.textContent = Math.round(summ * 5) / 100 
    //     })
    //     // сумма + налог = всего
    //     document.querySelectorAll('[data-amount-total]').forEach((elem) => {
    //         elem.textContent = Math.round(summ * 105) / 100
    //     })
    // }

}
