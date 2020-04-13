import {goodsArr} from './goods.js'

export default class MainPage {
    constructor(args = {}) {
        this.goodsArr = goodsArr[0]
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
        this.showCartLength()
        this.fillCartCard()
        this.fillMainPage()
        this.listenAddCartButton()
    }
    
    // заполняем карточками с товарами главную страницу
    fillMainPage() {
        const goodsGrinWrapperElement = document.querySelector('[data-main-goods-grid]')
        goodsGrinWrapperElement.innerHTML = ''
        let innerElement = ''

        // console.log(goodsArr[0])
        const arr = this.goodsArr
        for ( let i = 0; i < arr.length; i++ ) {
            // console.log(arr[i])
            innerElement += 
            `<div class="goods__card col-6 col-md-4 col-lg-3">
            <div class="good-card" data-goods-card="">
              <div class="good-card__header">
                <div class="good-card__picture"><img class="good-card__img" src="./assets/img/goods/${arr[i].src}" alt="Foaming Hand Sanitizer"></div>
                <div class="good-card__billets">
                  <div class="good-card__billet-wrapper">
                    <div class="billet billet--sale">on sale</div>
                  </div>
                  <div class="good-card__billet-wrapper">
                    <div class="billet billet--new">new</div>
                  </div>
                </div>
                <div class="good-card__look">
                  <div class="good-card__look-button" data-card-look="${arr[i].id}">быстрый просмотр</div>
                </div>
              </div>
              <div class="good-card__main">
                <div class="good-card__oferta-wrapper">
                  <div class="good-card__oferta">-20% </div>
                </div><a class="good-card__group" href="category.html">${arr[i].subcategory}</a><a class="good-card__title" data-goods-link="" href="product.html?id=${arr[i].id}">${arr[i].name}</a>
                <div class="good-card__price">${arr[i].price} $</div>
                <div class="good-card__old-price">16.00 $</div>
              </div>
              <div class="good-card__footer"></div>
            </div>
            </div>`
        }

        goodsGrinWrapperElement.innerHTML = innerElement

        this.listenLookButton()
    }

    // прослушка кнопок показа большой карточки
    listenLookButton() {
        const goodCardButtonsList = document.querySelectorAll('[data-card-look]')
        if (goodCardButtonsList.length > 0) {

            const wrapperElement = document.querySelector('[data-big-card-wrapper]')
            const closeElement = document.querySelector('[data-card-close]')
            // console.log(wrapperElement)
        
            for(let i = 0; i < goodCardButtonsList.length; i++) {
        
                goodCardButtonsList[i].addEventListener('click', () => {
                    // получаем id товара
                    const goodsId = goodCardButtonsList[i].getAttribute('data-card-look')

                    // заполняем попап карточку
                    this.fillCard(goodsId)
        
                    // показываем попап карточку
                    wrapperElement.classList.add('big-card-wrapper--translate')
                    setTimeout(() => {
                        wrapperElement.classList.add('big-card-wrapper--transition-none')
                        wrapperElement.style = `top: ${pageYOffset}px;`
                        document.body.style = 'overflow: hidden; padding-right: 18px;'
                        wrapperElement.classList.add('big-card-wrapper--show')
                    },400)
                })
            }
        
            // прослушка крестика закрытия попап карточки
            closeElement.addEventListener('click', () => {
                document.body.style = ''
                wrapperElement.style = ''
                wrapperElement.classList.remove('big-card-wrapper--show')
                setTimeout(() => {
                    wrapperElement.classList.remove('big-card-wrapper--transition-none')
                    setTimeout(() => {
                        wrapperElement.classList.remove('big-card-wrapper--translate')
        
                    },40)
                },40)
            })
        }
    }

    // заполняем карточку информацией о товаре
    fillCard(goodsId) {
        // console.log(this.goodsArr)
        const cardElement = document.querySelector('[data-big-card]')
        const imgElement = cardElement.querySelector('[data-big-card-img]')
        const titleElement = cardElement.querySelector('[data-big-card-title]')
        const subTitleElement = cardElement.querySelector('[data-big-card-subtitle]')
        const priceElement = cardElement.querySelector('[data-big-card-price]')
        const oldpriceElement = cardElement.querySelector('[data-big-card-oldprice]')
        const addToCartButtonElement = cardElement.querySelector('[data-big-card-to-cart]')

        for ( let i = 0; i < this.goodsArr.length; i++ ) {
            if (this.goodsArr[i].id == goodsId) {
                
                imgElement.src = './assets/img/goods/' + this.goodsArr[i].src
                titleElement.innerText = this.goodsArr[i].name
                subTitleElement.innerText = this.goodsArr[i].subtitle
                priceElement.innerText = this.goodsArr[i].price
                oldpriceElement.innerText = this.goodsArr[i].oldprice !== 'undefined' ? this.goodsArr[i].oldprice  : ''
                addToCartButtonElement.setAttribute('data-big-card-to-cart', goodsId)
                // this.addToCart()
                break
            }
        }

    }

    // прослушка кнопки добавления в корзину
    listenAddCartButton() {
        const addToCartButtonElement = document.querySelector('[data-big-card-to-cart]')
        const inputElement = document.querySelector('[data-big-card-count]')

        addToCartButtonElement.addEventListener('click', () => {
            const id = +addToCartButtonElement.getAttribute('data-big-card-to-cart')
            const quantity = +inputElement.value
            const obj = { id, quantity }
            console.log(obj)
            this.addToCart(obj)
        })

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

