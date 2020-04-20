import {goodsArr} from './goods.js'

export default class DefaultPage {
    constructor(args = {}) {
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
        this.goodsArr = goodsArr[0]
        this.showCartLength()
        this.fillCartCard()
        
    }

    // прослушка кнопок показа большой карточки
    listenLookButton() {
        const goodCardButtonsList = document.querySelectorAll('[data-card-look]')
        if (goodCardButtonsList.length > 0) {

           

            for(let i = 0; i < goodCardButtonsList.length; i++) {
        
                goodCardButtonsList[i].addEventListener('click', () => {
                    // получаем id товара
                    const goodsId = goodCardButtonsList[i].getAttribute('data-card-look')
                    for ( let i = 0; i < this.goodsArr.length; i++ ) {
                        if (this.goodsArr[i].id == goodsId) {
                            
                            // заполняем попап карточку
                            this.fillCard(this.goodsArr[i], '[data-big-card-wrapper]')
                            break
                        }
                    }

                    // показываем попап карточку
                    this.showPopUp('.big-card-wrapper')
                })
            }
        
           
        }
    }

    // прослушка элементов закрытия попап карточек
    listenClosePupUp() {
         // элемениы закрывания попап карточек
         const closeElement = document.querySelector('[data-card-close]')
         const closeSuccessElements = document.querySelectorAll('[data-success-card-close]')

         // прослушка крестика закрытия попап карточки
         closeElement.addEventListener('click', () => {
            this.hidePopUp('.big-card-wrapper')
        })
        // прослушка крестика и кнопки закрытия карточки успеха добавления в корзину
        closeSuccessElements.forEach((closeElement)=> {
            closeElement.addEventListener('click', () => {
                this.hidePopUp('.success-card-wrapper')
            })
        })
    }

    // показать всплывающее окно
    showPopUp(selector, timeout = 0) {
        const wrapperElement = document.querySelector(selector)
        // удаляем точку у класса
        selector = selector.slice(1)
        // console.log(selector + '--translate')
        setTimeout(() => {
            wrapperElement.classList.add(selector +'--translate')
            wrapperElement.classList.add(selector +'--show-card')
            wrapperElement.classList.add(selector +'--opacity-1')
            // console.log(wrapperElement)
            setTimeout(() => {
                wrapperElement.classList.add(selector +'--transition-none')
                wrapperElement.style = `top: ${pageYOffset}px;`
                document.body.style = 'overflow: hidden; padding-right: 18px;'
                wrapperElement.classList.add(selector +'--show')
                setTimeout(() => {
                    wrapperElement.classList.remove(selector +'--transition-none')

                },40)
            },400)
        },timeout)
    }

    // скрыто всплывающее окно
    hidePopUp(selector) {
        const wrapperElement = document.querySelector(selector)
        // удаляем точку у класса
        selector = selector.slice(1)
        console.log(selector + '--translate')
        wrapperElement.classList.remove(selector +'--show-card')
        wrapperElement.classList.remove(selector +'--opacity-1')
        
        setTimeout(() => {

            document.body.style = ''
            wrapperElement.style = ''
            wrapperElement.classList.remove(selector +'--show')
            setTimeout(() => {
                wrapperElement.classList.remove(selector +'--translate')
            },40)
        }, 400)
    }

    // заполняем карточку информацией о товаре
    fillCard(goodsObj, cardSelector) {
        // console.log(this.goodsArr)
        const cardElement = document.querySelector(cardSelector)
        const imgElement = cardElement.querySelector('[data-big-card-img]')
        const titleElement = cardElement.querySelector('[data-big-card-title]')
        const subTitleElement = cardElement.querySelector('[data-big-card-subtitle]')
        const priceElement = cardElement.querySelector('[data-big-card-price]')
        const oldpriceElement = cardElement.querySelector('[data-big-card-oldprice]')
        const addToCartButtonElement = cardElement.querySelector('[data-big-card-to-cart]')
        const sizeElement = cardElement.querySelector('[data-big-card-size]')
        const skinElement = cardElement.querySelector('[data-big-card-skin]')

                
        imgElement.src = './assets/img/goods/' + goodsObj.src
        titleElement.innerText = goodsObj.name
        subTitleElement.innerText = goodsObj.subtitle
        priceElement.innerText = goodsObj.price
        oldpriceElement.innerText = goodsObj.oldprice !== 'undefined' ? goodsObj.oldprice  : ''
        addToCartButtonElement.setAttribute('data-big-card-to-cart', goodsObj.id)
        sizeElement.innerText = goodsObj.value
        skinElement.innerText = goodsObj.skin

    }

    // прослушка кнопки добавления в корзину
    listenAddCartButton() {
        const addToCartButtonElement = document.querySelectorAll('[data-big-card-to-cart]')
        // const wrapperElement = document.querySelector('[data-big-card-wrapper]')

        addToCartButtonElement.forEach((button) => {
            const cardElement = button.closest('[data-big-card]')
            
            const inputElement = cardElement.querySelector('[data-big-card-count]')

            button.addEventListener('click', () => {
                const id = +button.getAttribute('data-big-card-to-cart')
                const quantity = +inputElement.value
                const obj = { id, quantity }
                console.log(obj)
                this.addToCart(obj)
                // убираем окошко
                this.hidePopUp('.big-card-wrapper')
                // показываем окошко успеха добавления в корзину
                this.showPopUp('.success-card-wrapper', 400)
                this.fillSuccessCard(obj, '.success-card-wrapper')
            })
        })
    }

    // прослушка иконки добавлния в корзину на карточке товара
    listenIconAddToCart() {
        const addToCartIconElement = document.querySelectorAll('[data-goods-card-icon-to-cart]')

        addToCartIconElement.forEach((iconElement) => {
            iconElement.addEventListener('click', () => {
                // получаем id товара
                const id = iconElement.getAttribute('data-goods-card-icon-to-cart')
                const obj = { id, quantity: 1 }
                // добавить в корзину
                this.addToCart( obj )
                // показзать окно успешного добавления в корзину
                this.showPopUp('.success-card-wrapper')
                // заполнить это окно нашим товаром
                this.fillSuccessCard(obj, '.success-card-wrapper')
            })
        })
    }

    // заполнить карточку об успешном добавлении в корзину
    fillSuccessCard(goodsObj, cardSelector) {
        const cardElement = document.querySelector(cardSelector)
        const imgElement = cardElement.querySelector('[data-success-card-img]')
        const titleElement = cardElement.querySelector('[data-success-card-title]')
        // const subTitleElement = cardElement.querySelector('[data-success-card-subtitle]')
        const priceElement = cardElement.querySelector('[data-success-card-price]')
        const quantityElement = cardElement.querySelector('[data-success-card-quantity]')
        const cartLengthElement = cardElement.querySelector('[data-sussec-card-cart-length]')
        const sizeElement = cardElement.querySelector('[data-success-card-size]')
        const skinElement = cardElement.querySelector('[data-success-card-skin]')

        // получаем все данные о товаре
        const productObj = this.getProductObj(goodsObj.id)
        // console.log(productObj)

        imgElement.src = './assets/img/goods/' + productObj.src
        titleElement.innerText = productObj.name
        quantityElement.innerText = goodsObj.quantity
        priceElement.innerText = productObj.price
        cartLengthElement.innerText = this.cart.length
        // oldpriceElement.innerText = goodsObj.oldprice !== 'undefined' ? goodsObj.oldprice  : ''
        // addToCartButtonElement.setAttribute('data-big-card-to-cart', goodsObj.id)
        sizeElement.innerText = productObj.value
        skinElement.innerText = productObj.skin
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
            for ( let j = 0; j < this.goodsArr.length; j++ ) {
                if (obj.id == this.goodsArr[j].id) {
                    obj.price = this.goodsArr[j].price
                    this.cart.push(obj)
                    // console.log(obj)
                }
            }
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
    fillCartCard(cartGoods) {
        // let cart
        // if (cartGoods) {
            // если корзину передали через параметр, то используем её
            // cart = cartGoods
        // } else {
            // если не передали, то используем корзину по умолчанию
            // cart = this.cart
        // }
        const iconCartElement = document.querySelector('[data-cart-card]')
        const cartThumbsElement = iconCartElement.querySelector('[data-cart-thumbs]')
        cartThumbsElement.innerHTML = 
        `<div class="cart-empty">
        <div class="cart-empty__icon">
          <div class="zmdi zmdi-alert-circle"></div>
        </div>
        <div class="cart-empty__notification">There are no more items in your cart</div>
      </div>`
        let innerElement = ''
        
        for ( let i = 0; i < this.cart.length; i++ ) {
            
            for ( let j = 0; j < this.goodsArr.length; j++ ) {
                if (this.cart[i].id == this.goodsArr[j].id) {
                    // console.log(this.cart[i].id)
                    // console.log(this.goodsArr[j].id)

                    innerElement +=
                    `<div class="cart-thumb">
                        <div class="cart-thumb__main"><img class="cart-thumb__img" src="./assets/img/goods/${this.goodsArr[j].src}" data-cart-thumb-card-img="">
                        <div class="cart-thumb__desc"><a class="cart-thumb__title" href="product.html?id=${this.goodsArr[j].id}">${this.goodsArr[j].name}</a>
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
        if (innerElement) {

            cartThumbsElement.innerHTML = innerElement
            document.querySelectorAll('[data-cart-proceed]').forEach((buttonElem) => {
                buttonElem.classList.remove('button--display-none')
            })
        } else {
            document.querySelectorAll('[data-cart-proceed]').forEach((buttonElem) => {
                buttonElem.classList.add('button--display-none')
            })
        }
        // если корзину передали через параметр, то это страница подтверждения заказа
        // if (!cartGoods) {
            this.listehCartThumbRemove()
            this.showTotalSumm()
        // }
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

    // изменяем значение в инпуте при нажатии + или -
    quantityInput(callback) {
        const inputList = document.querySelectorAll('[data-quantity-input]')
        
        for (let i = 0; i < inputList.length; i++) {
            const valueElement = inputList[i].querySelector('[data-input-value]')
            const plusElement = inputList[i].querySelector('[data-input-plus]')
            const minusElement = inputList[i].querySelector('[data-input-minus]')
            
            plusElement.addEventListener('click', () => {
                valueElement.value = +valueElement.value + 1
                valueElement.focus()
                // передаём колбэк для записи в local storage
                if (callback) {
                    callback(valueElement)
                }
            })
            minusElement.addEventListener('click', () => {
                if (valueElement.value > 1) {
                    valueElement.value = +valueElement.value - 1
                }
                valueElement.focus()
                // передаём колбэк для записи в local storage
                if (callback) {
                    callback(valueElement)
                }
            })
            valueElement.addEventListener('focus', () => {
                inputList[i].classList.add('quantity-input--shadow')
            })
            valueElement.addEventListener('blur', () => {
                inputList[i].classList.remove('quantity-input--shadow')
            })
    
    
        }
    }

    // считаем общую сумму
    showTotalSumm() {
        // console.log(cart)
        let summ = 0
        // const
        for (let i = 0; i < this.cart.length; i++) {
            summ += Math.round(this.cart[i].price * this.cart[i].quantity * 100) / 100
        }
        // console.log( Math.round(summ * 100) / 100 )
        summ = Math.round(summ * 100) / 100
        // выводим сумму в общий счёт
        document.querySelectorAll('[data-amount-summ]').forEach((elem) => {
            elem.textContent = summ
        })
        // считаем значение налога 5%
        document.querySelectorAll('[data-amount-tax]').forEach((elem) => {
            elem.textContent = Math.round(summ * 5) / 100 
        })
        // сумма + налог = всего
        document.querySelectorAll('[data-amount-total]').forEach((elem) => {
            elem.textContent = Math.round(summ * 105) / 100
        })
    }

    // получить объект продукта по id
    getProductObj(id) {
        // console.log(this.goodsArr)
        for ( let i = 0; i < this.goodsArr.length; i++ ) {
            if (this.goodsArr[i].id == id) {
                return this.goodsArr[i]
            }
        }
    }

    // получаем Значение key из get-запроса
    static getGetKey(key) {
        // const key = 'category_id'
        // console.log(location.search)
        const p = window.location.search;
        const id = p.match(new RegExp(key + '=([^&=]+)'));
        // console.log(id[1])
        return id ? id[1] : false;
    }
}