//TODO: FLOAT NUMBERS, KEYEVENTS

const allButtons = document.querySelectorAll('.wrapper-buttons__btn')

const numButtons = document.querySelectorAll('#btn-num')
const opButtons = document.querySelectorAll('#btn-op')

const btnCE = document.getElementById('btn-CE')
const btnC = document.getElementById('btn-C')
const btnRtn = document.getElementById('btn-rtn')

const btnEqual = document.getElementById('btn-equal')

const smallScreen = document.getElementById('small-screen')
const normalScreen = document.getElementById('normal-screen')

let val1, val2, result, op;

let addedValue = false
let numPressed = false
let hasResult = false
/* FUNCTIONS */

const resetAll = () => {
    smallScreen.value = ''
    normalScreen.value = '0'
    op = ''
    addedValue, numPressed, hasResult = false
    val1, val2 = undefined
    result = 0
}

const operate = (num1, num2, operator) => {
    let result = 0;

    if (operator === '+') result = num1 + num2
    else if (operator === '-') result = num1 - num2
    else if (operator === '×') result = num1 * num2
    else result = (num1 / num2)

    return result
}

allButtons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
        e.target.classList.add('pressed')   
    })
    btn.addEventListener('mouseup', (e) => {
        e.target.classList.remove('pressed')   
    })
})

numButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let btnValue = e.target.innerText

        if (hasResult) resetAll()

        if (normalScreen.value.length === 10 && !addedValue) return

        if (normalScreen.value === '0' || addedValue){
            normalScreen.value = btnValue
            addedValue = false
        } else normalScreen.value += btnValue

        numPressed = true
    })
})

opButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (op){
            if (e.target.innerText !== op){
                if (numPressed){
                    val1 = operate(val1, parseInt(normalScreen.value), op)
                    normalScreen.value = val1
                }
                smallScreen.value = val1 + e.target.innerText
                op = e.target.innerText
            } else {
                val1 = operate(val1, parseInt(normalScreen.value), op)
                if (isNaN(val1)) val1 = 0
                op = e.target.innerText
                smallScreen.value = val1 + op
                normalScreen.value = val1
            }
        } else {
            op = e.target.innerText
            val1 = parseInt(normalScreen.value)
            smallScreen.value = normalScreen.value + op
        }
        addedValue = true
        numPressed = false
        hasResult = false
    })
})

btnEqual.addEventListener('click', (e) => {
    if (op){
        val2 = parseInt(normalScreen.value)
        smallScreen.value += normalScreen.value + e.target.innerText
        result = operate(val1, val2, op)
        normalScreen.value = result
        op = ''
    }
    numPressed = false
    hasResult = true
})

btnC.addEventListener('click', resetAll)

btnCE.addEventListener('click', () => {

    if (result) resetAll()

    normalScreen.value = '0'
})

btnRtn.addEventListener('click', () => {
    if (normalScreen.value.length > 1) normalScreen.value = normalScreen.value.slice(0, -1);
    else normalScreen.value = '0'
})

