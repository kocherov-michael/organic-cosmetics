import {goodsArr} from './goods.js'

export default class MainPage {
    constructor(args = {}) {
        this.fillMainPage()
    }
    
    fillMainPage() {
        const goodsGrinWrapperElement = document.querySelector('[data-main-goods-grid]')
        goodsGrinWrapperElement.innerHTML = ''
        let innerElement = ''

        console.log(goodsArr[0])
        const arr = goodsArr[0]
        for ( let i = 0; i < arr.length; i++ ) {
            console.log(arr[i])
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
    }
}

