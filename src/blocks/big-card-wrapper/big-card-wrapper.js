import './big-card-wrapper.scss';
import {splitUrl, fillCard} from './../good-card/good-card.js';

// showBigCard()

function showBigCard() {
    const goodCardButtonsList = document.querySelectorAll('[data-card-look]')
    if (goodCardButtonsList.length > 0) {

        const wrapperElement = document.querySelector('[data-big-card-wrapper]')
        const closeElement = document.querySelector('[data-card-close]')
        // console.log(wrapperElement)
    
        for(let i = 0; i < goodCardButtonsList.length; i++) {
    
            goodCardButtonsList[i].addEventListener('click', () => {
                // console.log(goodCardButtonsList[i])
                const href = getHref(goodCardButtonsList[i])
                const obj = splitUrl(href)
                // console.log(obj)
                // заполняем попап карточку
                fillCard(obj)
    
                wrapperElement.classList.add('big-card-wrapper--translate')
                setTimeout(() => {
                    wrapperElement.classList.add('big-card-wrapper--transition-none')
                    wrapperElement.style = `top: ${pageYOffset}px;`
                    document.body.style = 'overflow: hidden; padding-right: 18px;'
                    wrapperElement.classList.add('big-card-wrapper--show')
                },400)
            })
        }
    
        closeElement.addEventListener('click', () => {
            document.body.style = ''
            wrapperElement.style = ''
            wrapperElement.classList.remove('big-card-wrapper--show')
            setTimeout(() => {
                wrapperElement.classList.remove('big-card-wrapper--transition-none')
                setTimeout(() => {
                    wrapperElement.classList.remove('big-card-wrapper--translate')
    
                },40)
            },40)
        })
    }
}

function getHref(elem) {
    const cardElement = elem.closest('[data-goods-card]')
    const linkElement = cardElement.querySelector('[data-goods-link]')
    
    return linkElement.href
}