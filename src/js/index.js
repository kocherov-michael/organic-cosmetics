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
import './../blocks/cart-empty/cart-empty.js'
import './../blocks/quantity-input/quantity-input.js'
import './../blocks/filter/filter.js'
import './../blocks/textarea/textarea.js'
import './../blocks/input/input.js'
import './../blocks/select/select.js'
import './../blocks/checkbox/checkbox.js'
import './../blocks/category-main/category-main.js'
import './../blocks/order-main/order-main.js'
import './../blocks/order-aside/order-aside.js'
import './../blocks/info-card/info-card.js'
import './../blocks/success-card/success-card.js'
import './../blocks/footer-subscribe/footer-subscribe.js'
import './../blocks/footer-contacts/footer-contacts.js'
import './../blocks/footer-socials/footer-socials.js'
import MainPage from './MainPage.js'
import CartPage from './CartPage.js'
import CategoryPage from './CategoryPage.js'
import ProductPage from './ProductPage.js'
import OrderPage from './OrderPage.js'
import ContactsPage from './ContactsPage.js'

// console.log(location)
// console.log(location.pathname)
if (location.pathname.includes('index.html')) {
    console.log('/index.html')
    const page = new MainPage()
}
else if (location.pathname.includes('cart.html')) {
    console.log('/cart.html')
    const page = new CartPage()
}
else if (location.pathname.includes('contacts.html')) {
    console.log('/contacts.html')
    const page = new ContactsPage()
}
else if (location.pathname.includes('product.html')) {
    console.log('/product.html')
    const page = new ProductPage()
}
else if (location.pathname.includes('category')) {
    console.log('/category.html')
    const page = new CategoryPage()
}
else if (location.pathname.includes('order.html')) {
    console.log('/order.html')
    const page = new OrderPage()
}
else {
    console.log('else')
    const page = new MainPage()
}