import './cart-card.scss'

iconCartCardHandler()
closeCartCardElemensHandler()

// обработчик иконки корзины в шапке
function iconCartCardHandler() {
    const cartIconElement = document.querySelector('[data-cart-icon]')
    const cartCardElement = document.querySelector('[data-cart-card]')

    cartIconElement.addEventListener('click', () => {
        // если кастрочка имее display none, то показываем её
        const isShown = cartCardElement.classList.contains('cart-card--display')
        if (!isShown) {
            showCartCard()
        } else {
            hideCartCard()
        }
    })
}

// скрытие карточки корзины
function hideCartCard() {
    const cartCardElement = document.querySelector('[data-cart-card]')
    cartCardElement.classList.remove('cart-card--opacity')
    setTimeout(() => {
        cartCardElement.classList.remove('cart-card--display')
    }, 400)
}

// плавный показ карточки корзины
function showCartCard() {
    const cartCardElement = document.querySelector('[data-cart-card]')
    cartCardElement.classList.add('cart-card--display')
    setTimeout(() => {
        cartCardElement.classList.add('cart-card--opacity')
    }, 10)
}

// обработчик элементов закрытия карточки корзины
function closeCartCardElemensHandler() {
    const closeElements = document.querySelectorAll('[data-cart-card-close]')
    
    for(let i = 0; i < closeElements.length; i++) {
        closeElements[i].addEventListener('click', () => {
            hideCartCard()
        })
    }
}