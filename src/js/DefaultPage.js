import {goodsArr} from './goods.js'

export default class DefaultPage {
    constructor(args = {}) {
        
    }

    // добавление в корзину
    addToCart(obj) {
        // const cart = JSON.parse(localStorage.getItem('cart')) || []
        // устанавливаем, записан ли уже объект в список
        let objIsSet = false
        
        for ( let i = 0; i < this.cart.length; i++ ) {
            if (this.cart[i].id === obj.id) {
                // если этот предмет уже есть в корзине, то плюсуем количество
                this.cart[i].quantity += +obj.quantity
                objIsSet = true
                break
            } 
        }
        if (!objIsSet) {
            this.cart.push(obj)
        }
        // this.cart = cart
        this.showCartLength()
        this.fillCartCard()
        // сохраняем в память
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    // показать количество предметов в корзине
    showCartLength() {
        const iconCartElement = document.querySelector('[data-icon-cart-value]')
        const value = this.cart.length || 0
        // если к ворзине ничего нет, то скрываем блок с цифрой
        if (!value) {
            iconCartElement.classList.add('icon-cart__value--display-none')
        } else {
            iconCartElement.classList.remove('icon-cart__value--display-none')
        }
        iconCartElement.innerHTML = value
    }

    // заполнить карточку корзины в шапке
    fillCartCard() {
        const iconCartElement = document.querySelector('[data-cart-card]')
        const cartThumbsElement = iconCartElement.querySelector('[data-cart-thumbs]')
        cartThumbsElement.innerHTML = ''
        let innerElement = ''
        
        for ( let i = 0; i < this.cart.length; i++ ) {
            
            for ( let j = 0; j < this.goodsArr.length; j++ ) {
                if (this.cart[i].id == this.goodsArr[j].id) {
                    // console.log(this.cart[i].id)
                    // console.log(this.goodsArr[j].id)

                    innerElement +=
                    `<div class="cart-thumb">
                        <div class="cart-thumb__main"><img class="cart-thumb__img" src="./assets/img/goods/${this.goodsArr[j].src}" data-cart-thumb-card-img="">
                        <div class="cart-thumb__desc"><a class="cart-thumb__title" href="product.html">${this.goodsArr[j].name}</a>
                            <div class="cart-thumb__close"><i class="zmdi zmdi-close" data-thumb-remove="${this.goodsArr[j].id}"></i></div>
                            <div class="card-thumb__price">${this.goodsArr[j].price} $</div>
                            <div class="card-thumb__info">${this.goodsArr[j].value}, Skin type: ${this.goodsArr[j].skin}</div>
                        </div>
                        </div>
                        <div class="cart-thumb__bottom">
                        <div class="cart-thumb__count">${this.cart[i].quantity}</div>
                        </div>
                    </div>`
                    // console.log(innerElement)
                }
            }
        }
        cartThumbsElement.innerHTML = innerElement
        this.listehCartThumbRemove()
    }

    listehCartThumbRemove() {
        const removeCartItemList = document.querySelectorAll('[data-thumb-remove]')
        for ( let i = 0; i < removeCartItemList.length; i++ ) {
            removeCartItemList[i].addEventListener('click', () => {
                const idRemove = removeCartItemList[i].getAttribute('data-thumb-remove')
                console.log(idRemove)
                this.removeFromCart(idRemove)
                this.fillCartCard()
                this.showCartLength()
            })
        }


    }
    removeFromCart(id) {
        for ( let i = 0; i < this.cart.length; i++ ) {
            if (this.cart[i].id == id) {
                this.cart.splice(i, 1)
                // сохраняем в память
                localStorage.setItem('cart', JSON.stringify(this.cart))
            }
        }
    }
}