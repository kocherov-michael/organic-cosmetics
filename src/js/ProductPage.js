import {goodsArr} from './goods.js'
import DefaultPage from './DefaultPage.js'

export default class ProductPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        console.log(this.cart)
    }
}