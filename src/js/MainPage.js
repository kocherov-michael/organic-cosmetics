import {goodsArr} from './goods.js'
import DefaultPage from './DefaultPage.js'

export default class MainPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        // пока отключил
        this.fillMainPage()
        super.listenAddCartButton()
        super.quantityInput()
        super.listenClosePupUp()
        console.log(this)
    }
    
    // заполняем карточками с товарами главную страницу
    fillMainPage() {
        const goodsGrinWrapperElement = document.querySelector('[data-main-goods-grid]')
        goodsGrinWrapperElement.innerHTML = ''
        let innerElement = ''

        // const arr = this.goodsArr
        // ограничиваю вывод на главную страницу только 12 элементами
        for ( let i = 0; i < 12; i++ ) {
          innerElement += this.getGoodsTemplate(this.goodsArr[i])
        }

        goodsGrinWrapperElement.innerHTML = innerElement
        // показать большую карточку товара
        super.listenLookButton()
        // добавить товар в корзину
        super.listenIconAddToCart()
    }
}