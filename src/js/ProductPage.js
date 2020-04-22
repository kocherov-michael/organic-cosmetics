import {goodsArr} from './goods.js'
import DefaultPage from './DefaultPage.js'

export default class ProductPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        this.productId = DefaultPage.getGetKey('id')
        this.productObj = super.getProductObj(this.productId)
        super.fillCard(this.productObj, '[data-product-card]')
        super.listenAddCartButton()
        super.quantityInput()
        super.listenClosePupUp()
        this.fillProductDesc()
        this.toggleProductDesc()
        super.listenClosePupUp()
        super.fillGoodsBottom()
    }

    // заполнить описание продукта
    fillProductDesc() {
        const descElements = document.querySelectorAll('[data-product-card-desc]')
        descElements.forEach((descElem) => {
            const descAttr = descElem.getAttribute('data-product-card-desc')
            descElem.innerHTML = this.productObj[descAttr]
        })
    }

    // переключение в описании между табами
    toggleProductDesc() {
        const toggleElements = document.querySelectorAll('[data-product-card-toggle]')
        const descElements = document.querySelectorAll('[data-product-card-desc]')
        
        for ( let j = 0; j < toggleElements.length; j++ ) {

            toggleElements[j].addEventListener('click', () => {
                const toggleAttr = toggleElements[j].getAttribute('data-product-card-toggle')
    
                for ( let i = 0; i < toggleElements.length; i++ ) {
                    // сначала убираем активные стили у всех ярлыков
                    toggleElements[i].classList.remove('product-page-card__title-item--active')
                }
    
                for ( let i = 0; i < descElements.length; i++ ) {
                    const descAttr = descElements[i].getAttribute('data-product-card-desc')
                   
                    if (toggleAttr == descAttr) {
                        // если описание совпало с ярлыком, то добавляем активные стили
                        descElements[i].classList.add('product-page-card__description--active')
                        // добавляем активный стиль к нажатому ярлыку
                        toggleElements[j].classList.add('product-page-card__title-item--active')
                    } else {
                        // убираем активные стили у остальных описаний
                        descElements[i].classList.remove('product-page-card__description--active')
                    }
                }
            })
        }
    }

    
}