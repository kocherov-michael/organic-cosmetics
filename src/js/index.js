import './../blocks/big-card/big-card.js'
import './../blocks/good-card/good-card.js'
import './../blocks/main-slider/main-slider.js'
import './../blocks/banner/banner.js'
import './../blocks/subscribe/subscribe.js'
import './../blocks/billet/billet.js'
import './../blocks/button/button.js'
import './../blocks/path/path.js'
import './../blocks/big-card-wrapper/big-card-wrapper.js'
import './../blocks/cart-card/cart-card.js'
import './../blocks/cart-thumb/cart-thumb.js'
import './../blocks/cart-item/cart-item.js'
import './../blocks/quantity-input/quantity-input.js'
import './../blocks/filter/filter.js'
import './../blocks/input/input.js'
import './../blocks/select/select.js'
import './../blocks/checkbox/checkbox.js'
import './../blocks/category-main/category-main.js'
import './../blocks/order-main/order-main.js'
import './../blocks/order-aside/order-aside.js'
import './../blocks/footer-subscribe/footer-subscribe.js'
import './../blocks/footer-contacts/footer-contacts.js'
import './../blocks/footer-socials/footer-socials.js'
import MainPage from './MainPage.js'
import CartPage from './CartPage.js'

// console.log(location.pathname)
if (location.pathname === '/index.html' || location.pathname === '/') {
    const page = new MainPage()
}
else if (location.pathname === '/cart.html') {
    const page = new CartPage()
}