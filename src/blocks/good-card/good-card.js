import './good-card.scss'

// слушаем клики по ссылкам на товары
listenLinks()
function listenLinks() {
    const linkElement = document.querySelectorAll('[data-goods-link]')
    linkElement.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault()
            const obj = splitUrl(link.href)
            
            // console.log(obj)
    
            // записываем в хранилище объект с данными требуемого товара
            localStorage.setItem('search', JSON.stringify(obj))
            // перенаправляем пользователя на страницу с товаром и подставляем фейковый GET-запрос
            // console.log(obj.href + '?search=' + obj.title)
            document.location.href = obj.href + '?search=' + obj.title
        })
    })
}

export function splitUrl(href) {
    // разбиваем адресную строку и получаем get-запрос
    const search = href.split('?')[1]
    // преобразуем GET-запрос в обьект
    const arr = search.split('&')
    // console.log(arr)
    const obj = {href: href.split('?')[0]}
    for (let i = 0; i < arr.length; i++) {
        const subArr = arr[i].split('=')
        const key = subArr[0]
        const value = subArr[1].split('%20').join(' ')
        obj[key] = value
    }
    return obj
}

if (location.pathname == "/product.html") {
    
    const obj = JSON.parse(localStorage.getItem('search'))
    
    // console.log(obj)
    fillCard(obj)
}
// заполняем карточку информацией о товаре
export function fillCard(obj) {
    // const cardElement = document.querySelector('[data-big-card-wrapper]')
    // const imgElement = cardElement.querySelector('[data-big-card-img]')
    // const titleElement = cardElement.querySelector('[data-big-card-title]')
    // const priceElement = cardElement.querySelector('[data-big-card-price]')
    // const oldpriceElement = cardElement.querySelector('[data-big-card-oldprice]')
    // console.log(cardElement)
    // console.log(imgElement)
    // imgElement.src = obj.src
    // titleElement.innerText = obj.title
    // priceElement.innerText = obj.price
    // oldpriceElement.innerText = obj.oldprice !== 'undefined' ? obj.oldprice  : ''
}