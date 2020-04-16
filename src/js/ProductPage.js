import {goodsArr} from './goods.js'
import DefaultPage from './DefaultPage.js'

export default class ProductPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        this.productId = DefaultPage.getGetKey('id')
        this.productObj = super.getProductObj(this.productId)
        console.log(this.productObj)
        super.fillCard(this.productObj, '[data-product-card]')
        super.listenAddCartButton()
        super.quantityInput()
    }

    // получить объект продукта
    // getProductObj() {
    //     console.log(this.goodsArr)
    //     for ( let i = 0; i < this.goodsArr.length; i++ ) {
    //         if (this.goodsArr[i].id == this.productId) {
    //             return this.goodsArr[i]
    //         }
    //     }
    // }

    
}