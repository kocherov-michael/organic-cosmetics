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
        this.fillCategoryMainHeader()
        
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

    // поставить картинку и описание для категории товаров
    fillCategoryMainHeader() {
        const categoryImgElement = document.querySelector('[data-category-bg]')
        const categoryTitleElement = document.querySelector('[data-category-title]')
        const categoryDescElement = document.querySelector('[data-category-desc]')

        for ( let i = 0; i < this.categoriesArr.length; i++ ) {
            if (this.categoriesArr[i].category_id == this.categoryId) {

                categoryImgElement.setAttribute('src', `./assets/img/bg/${this.categoriesArr[i].src}`)
                categoryTitleElement.innerHTML = this.categoriesArr[i].title
                categoryDescElement.innerHTML = this.categoriesArr[i].desc
            }
        }
    }
}