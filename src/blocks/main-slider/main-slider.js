import './main-slider.scss'

mainSlider ('[data-slider]')

// для корректной работы после последнего элемента вставить копию первого
// {data-slider: {data-arrow-left, data-arrow-right, data-slider-wrapper:[data-slider-item, data-slider-item, ...]}}
function mainSlider (attr) {
    const sliderList = document.querySelectorAll(attr)

    sliderList.forEach((slider) => {
        const leftArrowElement = slider.querySelector('[data-arrow-left]')
        const rightArrowElement = slider.querySelector('[data-arrow-right]')
        const slidersWrapperElement = slider.querySelector('[data-slider-wrapper]')
        // считаем количество активных слайдов
        const count = slider.querySelectorAll('[data-slider-item]').length - 1
        // позиция обёртки
        let translatePosition = 0

        // стрелка влево
        leftArrowElement.addEventListener('click', () => {
            if (translatePosition > -100 * count) {
                slidersWrapperElement.style = `transform: translateX(${translatePosition -= 100}%);`
                
                if (translatePosition === -100 * count) {
                    setTimeout(() => {
                        slidersWrapperElement.style = `transition: none;`
                        setTimeout (() => {
    
                            slidersWrapperElement.style += `transform: translateX(${translatePosition = 0}%);`
                        }, 100)

                    }, 400)
                }
            }
        })

        // стрелка вправо
        rightArrowElement.addEventListener('click', () => {
            
            if (translatePosition < 0) {
                slidersWrapperElement.style = `transform: translateX(${translatePosition += 100}%);`
            }
            else if (translatePosition === 0){

                slidersWrapperElement.style = `transition: none; transform: translateX(${translatePosition = -100 * count}%);`
                setTimeout(() => {
                    slidersWrapperElement.style = `transform: translateX(${translatePosition += 100}%);`
                },10)

            }
        })
    })
}