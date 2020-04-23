import {goodsObj} from './goods.js'
import DefaultPage from './DefaultPage.js'

export default class CategoryPage extends DefaultPage {
    constructor(args = {}) {
        super(args = {})
        this.categoriesArr = goodsObj.categories
        this.categoryId = DefaultPage.getGetKey('category_id')
        this.categoryObj = this.getCategoryObj()
        // массив критериев для фильтрации
        this.choosenFilter = []
        // сортировка товаров по данному критерию
        this.sort = 'noSort'
        // массив с товарами выбранной категории
        this.categoryGoodsArr = this.getCategoryGoods()
        this.fillCategoryMainHeader()
        this.fillCategoryGrid()
        this.fillBrandFilter()
        this.fillSubcategoriesFilter()
        
        super.listenAddCartButton()
        this.useFilterForGoods()
        super.listenClosePupUp()
        super.setPath(this.categoryObj.title)
        super.fillGoodsBottom()
        this.sortGoods()
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
        // массив с уже добавленными товарами
        const alreadryAddedGoods = []

        // клонируем массив чтобы при сортировке не изменился изначальный
        this.sortedGoodsArr = Object.assign([],this.categoryGoodsArr)
        
        // отсортировываем массив товаров, если выбраны критерии сортировки
        if (this.sort !== 'noSort') {
          let sign = 1
          if (this.sort === 'toLow') {
            sign = -1
          }
          // сортируем массив товаров по убыванию или возрастанию цены
          this.sortedGoodsArr.sort((a, b) => a.price*sign-b.price*sign)
        } 

        for ( let i = 0; i < this.sortedGoodsArr.length; i++ ) {

          if ( this.choosenFilter.length === 0) {
            // если массив фильтра пустой, то добавляем все товары категории
            innerElement += this.getGoodsTemplate(this.sortedGoodsArr[i], true)
            continue
          } 
          // если не пустой, то обходим его и находим фильтры
          for (let j = 0; j < this.choosenFilter.length; j++ ) {
            // если совпала подкатегория
            const findBySubcategory = this.sortedGoodsArr[i].subcategory_id == this.choosenFilter[j]
            // если совпал бренд , убираем пробелы у названия, т.к. в атрибутах нет пробелов
            const findByBrand = this.sortedGoodsArr[i].brand.replace(/\s+/g, '') == this.choosenFilter[j]
            // проверяем был ло уже этот товар добавлен на страницу
            const isAdded = alreadryAddedGoods.includes(this.sortedGoodsArr[i].id)

            // если товар удовлетворяет всем условиям, то добавляем на страницу
            if ( (findBySubcategory || findByBrand) && !isAdded ) {
               
              innerElement += this.getGoodsTemplate(this.sortedGoodsArr[i], true)
              alreadryAddedGoods.push(this.sortedGoodsArr[i].id)
            }
          }
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
      // const filterSubcategoriesElement = document.querySelector('[data-filter-subcategories]')
      filterBrandElement.innerHTML = ''
      let innerElement = ''
      const brands = new Set()

      // записываем в СЕТ brands названия брендов (по 1 экземпляру)
      for ( let i = 0; i < this.categoryGoodsArr.length; i++ ) {
        
        brands.add(this.categoryGoodsArr[i].brand)
      }
      
      for (let brand of brands) {
        // убираем пробелы в названии чтобы записать в аттрибут
        const brandSpaceOff = brand.replace(/\s+/g, '')
        
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
          <input class="checkbox__input" type="checkbox" name="checkbox" value="${subcategoryId}" data-input-checked='false'><span class="checkbox__new-input"> 
            <div class="checkbox__check-item"></div></span>
          <div class="checkbox__text">${subcategoryName}</div>
          </label>`
      }
      filterSubcategoriesElement.innerHTML = innerElement
    }

    // фильтруем товары по выбранным параметрам
    useFilterForGoods() {
      const formElement = document.querySelector('[data-filter-form]')
      const inputList = formElement.querySelectorAll('input')
      
      inputList.forEach((input, i, arr) => {
        input.addEventListener('change', () => {
          const choosenFilter = []

          // проверяем, отмечел ли уже инпут
          if (input.getAttribute('data-input-checked') === 'true') {
            // если инпут уже отмечен, то снимаем отметку
            input.setAttribute('data-input-checked', 'false')
            
          } else {
            // если не отмечен, то отмечаем
            input.setAttribute('data-input-checked', 'true')
          }
          
          // если отмеченных элементов не найдём, то ссылаемся на пустой массив
          this.choosenFilter = []
          // перебираем список инпутов с целью найти отмеченные
          arr.forEach((item) => {
            // если нашли отмеченные элементы, записываем в массив
            if(item.getAttribute('data-input-checked') === 'true') {
              choosenFilter.push(item.value)
              // ссылаемся на новый массив
              this.choosenFilter = choosenFilter
              
            }
          })
          // выводим заново товары на тсраницу уже с использованием фильтра
          this.fillCategoryGrid()

        })
      })
    }

    // сортировака товаров
    sortGoods() {
      const selectElement = document.querySelector('[data-category-select]')
      selectElement.addEventListener('change', () => {
        console.log(selectElement.value)
        // выводим заново товары на тсраницу уже с использованием фильтра
        this.sort = selectElement.value
        this.fillCategoryGrid()
      })
    }
}