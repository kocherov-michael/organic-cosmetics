import DefaultPage from './DefaultPage.js'

export default class MainPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        // пока отключил
        this.fillMainPage()
        super.listenAddCartButton()
        super.quantityInput()
        super.listenClosePupUp()
        // console.log(this)
        this.listenSortButtons()
        this.listenLinkCards()
        super.fillGoodsBottom()
    }
    
    // заполняем карточками с товарами главную страницу
    fillMainPage(sort=true) {
      const goodsGrinWrapperElement = document.querySelector('[data-main-goods-grid]')
      goodsGrinWrapperElement.innerHTML = ''
      let innerElement = ''
      

      let i = 0
      let setItem = 0
      // устанавливаем, сколько товаров отображать на странице
      while(setItem < 12) {
        if (sort === true) {
          // добавляем товары все подряд
          innerElement += this.getGoodsTemplate(this.goodsArr[i])
          setItem++
        }
        else if (this.goodsArr[i] && this.goodsArr[i][sort]) {
          // если товар удовлетворяет условиям сортировки 
          innerElement += this.getGoodsTemplate(this.goodsArr[i])
          setItem++
        } 
        else if (i >= this.goodsArr.length ) {
          // если товаров больше нет, а цикл не закончился
          break
        }
        i++
      }

      goodsGrinWrapperElement.innerHTML = innerElement
      // показать большую карточку товара
      super.listenLookButton()
      // добавить товар в корзину
      super.listenIconAddToCart()
    }

    // прослушка кнопок сортироваки
    listenSortButtons() {
      const sortButtonList = document.querySelectorAll('[data-main-sort]')
      sortButtonList.forEach((button) => {
        button.addEventListener('click', () => {
          const sort = button.getAttribute('data-main-sort')
          // заполняем страницу товарами выбранного сорта
          this.fillMainPage(sort)
        })
      })
    }

    // прослушка карточек-картинок под главным слайдером
    listenLinkCards() {
      const limitedLinkElement = document.querySelector('[data-main-top-limited]')
      limitedLinkElement.addEventListener('click', () => {
        // console.log(this)
        this.fillMainPage('limited')
      })

      
      
    }
}