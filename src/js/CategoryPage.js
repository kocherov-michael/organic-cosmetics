import {goodsArr} from './goods.js'
import DefaultPage from './DefaultPage.js'

export default class CategoryPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        this.goodsArr = goodsArr[0]
        this.categoriesArr = goodsArr[1]
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
        super.showCartLength()
        super.fillCartCard()
        // this.fillCartPage()
        this.categoryId = this.getCategoryId()
        this.categoryObj = this.getCategoryObj()
        this.fillCategoryMainHeader()
        this.fillCategoryGrid()
        
        console.log(this.categoriesArr)
        // super.listenAddCartButton()
    }
    // получаем id категории из get Запроса
    getCategoryId() {
        const key = 'category_id'
        // console.log(location.search)
        const p = window.location.search;
        const id = p.match(new RegExp(key + '=([^&=]+)'));
        // console.log(id[1])
        return id ? id[1] : false;
    }

    // получить объект категории
    getCategoryObj() {
        for ( let i = 0; i < this.categoriesArr.length; i++ ) {
            if (this.categoriesArr[i].category_id == this.categoryId) {
                return this.categoriesArr[i]
            }
        }
    }

    // поставить картинку и описание для категории товаров
    fillCategoryMainHeader() {
        const categoryImgElement = document.querySelector('[data-category-bg]')
        const categoryTitleElement = document.querySelector('[data-category-title]')
        const categoryDescElement = document.querySelector('[data-category-desc]')
        // ставим ссылку на картинку
        categoryImgElement.setAttribute('src', `./assets/img/bg/${this.categoryObj.src}`)
        // название категории
        categoryTitleElement.innerHTML = this.categoryObj.title
        // описание категории
        categoryDescElement.innerHTML = this.categoryObj.desc
    }

    // заполнить товарами страницу категории
    fillCategoryGrid() {
        const categoryGridElement = document.querySelector('[data-category-grid]')
        categoryGridElement.innerHTML = ''
        let innerElement = ''
        // console.log(this.categoryId)

        for ( let i = 0; i < this.goodsArr.length; i++ ) {
            // console.log(this.goodsArr[i].category_id)
            if (this.goodsArr[i].category_id == this.categoryId) {
                innerElement += 
                `<div class="category-grid__card col-6 col-lg-4 col-xl-3">
                <div class="good-card" data-goods-card="">
              <div class="good-card__header">
                <div class="good-card__picture"><img class="good-card__img" src="./assets/img/goods/${this.goodsArr[i].src}" alt="Foaming Hand Sanitizer"></div>
                <div class="good-card__billets">
                  <div class="good-card__billet-wrapper">
                    <div class="billet billet--sale">on sale</div>
                  </div>
                  <div class="good-card__billet-wrapper">
                    <div class="billet billet--new">new</div>
                  </div>
                </div>
                <div class="good-card__look">
                  <div class="good-card__look-button" data-card-look="${this.goodsArr[i].id}">быстрый просмотр</div>
                </div>
              </div>
              <div class="good-card__main">
                <div class="good-card__oferta-wrapper">
                  <div class="good-card__oferta">-20% </div>
                </div><a class="good-card__group" href="category.html">${this.goodsArr[i].subcategory}</a><a class="good-card__title" data-goods-link="" href="product.html?id=${this.goodsArr[i].id}">${this.goodsArr[i].name}</a>
                <div class="good-card__price">${this.goodsArr[i].price} $</div>
                <div class="good-card__old-price">16.00 $</div>
              </div>
              <div class="good-card__footer"></div>
            </div>
              </div>`
            }
        }
        categoryGridElement.innerHTML = innerElement
        super.listenLookButton()
    }
}