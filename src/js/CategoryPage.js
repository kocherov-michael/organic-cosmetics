import {goodsArr} from './goods.js'
import DefaultPage from './DefaultPage.js'

export default class CategoryPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        this.categoriesArr = goodsArr[1]
        this.categoryId = DefaultPage.getGetKey('category_id')
        this.categoryObj = this.getCategoryObj()
        // массив с товарами выбранной категории
        this.categoryGoodsArr = this.getCategoryGoods()
        this.fillCategoryMainHeader()
        this.fillCategoryGrid()
        this.fillBrandFilter()
        this.fillSubcategoriesFilter()
        
        super.listenAddCartButton()
        this.useFilterForGoods()
        super.listenClosePupUp()
    }
    
    // получаем id категории из get Запроса
    getCategoryId() {
        const key = 'category_id'
        // console.log(location.search)
        const p = window.location.search;
        const id = p.match(new RegExp(key + '=([^&=]+)'));
        // console.log(id[1])
        return id ? id[1] : false;
    }

    // получить объект категории
    getCategoryObj() {
        for ( let i = 0; i < this.categoriesArr.length; i++ ) {
            if (this.categoriesArr[i].category_id == this.categoryId) {
                return this.categoriesArr[i]
            }
        }
    }

    // поставить картинку и описание для категории товаров
    fillCategoryMainHeader() {
        const categoryImgElement = document.querySelector('[data-category-bg]')
        const categoryTitleElement = document.querySelector('[data-category-title]')
        const categoryDescElement = document.querySelector('[data-category-desc]')
        // ставим ссылку на картинку
        categoryImgElement.setAttribute('src', `./assets/img/bg/${this.categoryObj.src}`)
        // название категории
        categoryTitleElement.innerHTML = this.categoryObj.title
        // описание категории
        categoryDescElement.innerHTML = this.categoryObj.desc
    }

    // получить массив с товарами выбранной категории
    getCategoryGoods() {
      const arr = []
      for ( let i = 0; i < this.goodsArr.length; i++ ) {
        if (this.goodsArr[i].category_id == this.categoryId) {
          arr.push(this.goodsArr[i])
        }
      }
      return arr
    }

    // заполнить товарами страницу категории
    fillCategoryGrid() {
        const categoryGridElement = document.querySelector('[data-category-grid]')
        categoryGridElement.innerHTML = ''
        let innerElement = ''

        for ( let i = 0; i < this.categoryGoodsArr.length; i++ ) {
          innerElement += this.getGoodsTemplate(this.categoryGoodsArr[i])
        }
        categoryGridElement.innerHTML = innerElement
        // показать большую карточку товара
        super.listenLookButton()
        // добавить товар в корзину
        super.listenIconAddToCart()
    }

    // создаём условия фильтра
    fillBrandFilter() {
      const filterBrandElement = document.querySelector('[data-filter-brand]')
      const filterSubcategoriesElement = document.querySelector('[data-filter-subcategories]')
      filterBrandElement.innerHTML = ''
      let innerElement = ''
      const brands = new Set()

      // записываем в СЕТ brands названия брендов (по 1 экземпляру)
      for ( let i = 0; i < this.categoryGoodsArr.length; i++ ) {
        // console.log(this.goodsArr[i].brand)
        brands.add(this.categoryGoodsArr[i].brand)
      }
      // console.log(brands)
      for (let brand of brands) {
        const brandSpaceOff = brand.replace(/\s+/g, '')
        // console.log(brandSpaceOff)
        innerElement += 
        `<label class="checkbox">
          <input class="checkbox__input" type="checkbox" name="checkbox" value="${brandSpaceOff}"><span class="checkbox__new-input"> 
            <div class="checkbox__check-item"></div></span>
          <div class="checkbox__text">${brand}</div>
          </label>`
      }
      filterBrandElement.innerHTML = innerElement
    }

    // заполняем чекбоксы субкатегорий
    fillSubcategoriesFilter() {
      const filterSubcategoriesElement = document.querySelector('[data-filter-subcategories]')
      filterSubcategoriesElement.innerHTML = ''
      let innerElement = ''
      const subcategories = new Set()

      // записываем в СЕТ subcategories названия брендов (по 1 экземпляру)
      for ( let i = 0; i < this.categoryGoodsArr.length; i++ ) {
        
        subcategories.add(this.categoryGoodsArr[i].subcategory_id)
      }

      // проходимся по СЕТу
      for (let subcategoryId of subcategories) {
        
        let subcategoryName = ''
        for (let i = 0; i < this.categoryObj.subcategories.length; i++ ) {
          // находим названия субкатегорий по их id
          if (this.categoryObj.subcategories[i].subcategory_id == subcategoryId) {
            subcategoryName = this.categoryObj.subcategories[i].subcategory
            break
          }
        }
        
        innerElement += 
        `<label class="checkbox">
          <input class="checkbox__input" type="checkbox" name="checkbox" value="${subcategoryId}"><span class="checkbox__new-input"> 
            <div class="checkbox__check-item"></div></span>
          <div class="checkbox__text">${subcategoryName}</div>
          </label>`
      }
      filterSubcategoriesElement.innerHTML = innerElement
    }

    useFilterForGoods() {
      const formElement = document.querySelector('[data-filter-form]')
      formElement.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log('submit')
      })
    }
}