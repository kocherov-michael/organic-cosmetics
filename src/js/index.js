import './../blocks/big-card/big-card.js'
import './../blocks/good-card/good-card.js'
import './../blocks/main-slider/main-slider.js'
import './../blocks/banner/banner.js'
import './../blocks/subscribe/subscribe.js'
import './../blocks/billet/billet.js'
import './../blocks/button/button.js'
import './../blocks/big-card-wrapper/big-card-wrapper.js'
import './../blocks/quantity-input/quantity-input.js'
import './../blocks/footer-subscribe/footer-subscribe.js'
import './../blocks/footer-contacts/footer-contacts.js'
import './../blocks/footer-socials/footer-socials.js'

// слушаем клики по ссылкам на товары
listenLinks()
function listenLinks() {
    const linkElement = document.querySelectorAll('[data-goods-link]')
    linkElement.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault()
            // разбиваем адресную строку и получаем get-запрос
            const src = link.href.split('?')[0]
            const search = link.href.split('?')[1]
            // преобразуем GET-запрос в обьект
            const arr = search.split('&')
            // console.log(arr)
            const obj = {}
            for (let i = 0; i < arr.length; i++) {
                const subArr = arr[i].split('=')
                const key = subArr[0]
                const value = subArr[1].split('%20').join(' ')
                obj[key] = value
            }
            // console.log(obj)
    
            // записываем в хранилище объект с данными требуемого товара
            localStorage.setItem('search', JSON.stringify(obj))
            // перенаправляем пользователя на страницу с товаром и подставляем фейковый GET-запрос
            document.location.href = src + '?' + arr[0]
        })
    })
}

if (location.pathname == "/product.html") {
    
    const obj = JSON.parse(localStorage.getItem('search'))
    
    // console.log(obj)
    fillCard(obj)
}
// заполняем карточку информацией о товаре
function fillCard(obj) {
    const cardElement = document.querySelector('[data-big-card]')
    const imgElement = cardElement.querySelector('[data-big-card-img]')
    const titleElement = cardElement.querySelector('[data-big-card-title]')
    const priceElement = cardElement.querySelector('[data-big-card-price]')
    const oldpriceElement = cardElement.querySelector('[data-big-card-oldprice]')

    imgElement.src = obj.src
    titleElement.innerText = obj.title
    priceElement.innerText = obj.price
    oldpriceElement.innerText = obj.oldprice !== 'undefined' ? obj.oldprice  : ''
}
