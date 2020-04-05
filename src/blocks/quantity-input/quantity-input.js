import './quantity-input.scss'

quantityInput()

function quantityInput() {
    const inputList = document.querySelectorAll('[data-quantity-input]')
    for (let i = 0; i < inputList.length; i++) {
        const valueElement = inputList[i].querySelector('[data-input-value]')
        const plusElement = inputList[i].querySelector('[data-input-plus]')
        const minusElement = inputList[i].querySelector('[data-input-minus]')

        plusElement.addEventListener('click', () => {
            valueElement.value = +valueElement.value + 1
            valueElement.focus()
        })
        minusElement.addEventListener('click', () => {
            if (valueElement.value > 0) {
                valueElement.value = +valueElement.value - 1
            }
            valueElement.focus()
        })
        valueElement.addEventListener('focus', () => {
            inputList[i].classList.add('quantity-input--shadow')
        })
        valueElement.addEventListener('blur', () => {
            inputList[i].classList.remove('quantity-input--shadow')
        })


    }
}