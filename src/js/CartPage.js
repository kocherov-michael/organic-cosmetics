import {goodsArr} from './goods.js'
// import {quantityInput} from '../blocks/quantity-input/quantity-input.js'
import DefaultPage from './DefaultPage.js'

export default class CartPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        this.goodsArr = goodsArr[0]
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
        super.showCartLength()
        super.fillCartCard()
        this.fillCartPage()
        
        
        // super.listenAddCartButton()
    }

    // заполняем страницу корзины товарами
    fillCartPage() {
        const goodsContainerElement = document.querySelector('[data-cart-goods-container]')
        goodsContainerElement.innerHTML = ''
        let innerElement = ''

        // console.log(this.cart)
        // console.log(this.goodsArr)
        for ( let i = 0; i < this.cart.length; i++ ) {
            for ( let j = 0; j < this.goodsArr.length; j++ ) {
                if (this.cart[i].id == this.goodsArr[j].id) {

                    innerElement +=
                    `<div class="cart-goods__item">
                        <div class="cart-item container">
                            <div class="row">
                                <div class="cart-item__close col-1">
                                    <div class="cart-item__close-icon" data-cart-item-remove="${this.cart[i].id}"><i class="zmdi zmdi-close"></i></div>
                                </div>
                                <div class="cart-item__picture col-4 col-sm-5 col-md-2">
                                    <img class="cart-item__img" src="./assets/img/goods/${this.goodsArr[j].src}" data-cart-thumb-card-img=""></div>
                                <div class="cart-item__title col-6 col-md-3"><a class="cart-item__link" href="product.html">${this.goodsArr[j].name}</a>
                                <div class="cart-item__info">${this.goodsArr[j].value}, Skin type: ${this.goodsArr[j].skin}</div>
                                </div>
                                <div class="cart-item__price col-3 col-sm-6 col-md-2">$25.60</div>
                                <div class="cart-item__input col-6 col-sm-3 col-md-2">
                                <div class="quantity-input quantity-input--blue" data-quantity-input="">
                                    <input class="quantity-input__field" value="${this.cart[i].quantity}" data-input-value="">
                                    <div class="quantity-input__plus" data-input-plus="">+</div>
                                    <div class="quantity-input__minus" data-input-minus="">-</div>
                                </div>
                                </div>
                                <div class="cart-item__total col-3 col-md-2">$25.60</div>
                            </div>
                        </div>
                    </div>`
                }
            }

        }
        goodsContainerElement.innerHTML = innerElement
        this.listenCartPageRemove()
        super.quantityInput()
        this.quantityInputListener()
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

    // 
    quantityInputListener() {
        const inputList = document.querySelectorAll('[data-input-value]')
        for (let i = 0; i < inputList.length; i++) {
            console.log(inputList[i].value)
            inputList[i].addEventListener('input', () => {
                console.log(inputList[i].value)
            })
        }
    }

}
