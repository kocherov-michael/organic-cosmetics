import {goodsArr} from './goods.js'

export default class MainPage {
    constructor(args = {}) {
        this.goodsArr = goodsArr[0]
        this.fillMainPage()
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

        for ( let i = 0; i < this.goodsArr.length; i++ ) {
            if (this.goodsArr[i].id == goodsId) {
                
                imgElement.src = './assets/img/goods/' + this.goodsArr[i].src
                titleElement.innerText = this.goodsArr[i].name
                subTitleElement.innerText = this.goodsArr[i].subtitle
                priceElement.innerText = this.goodsArr[i].price
                oldpriceElement.innerText = this.goodsArr[i].oldprice !== 'undefined' ? this.goodsArr[i].oldprice  : ''
            }
        }

    }
}

