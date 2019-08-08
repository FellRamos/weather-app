// console.log('Client side javascript file is loaded!')

/**
 * 
    Fetch is a browser API, not part of javascript -- Example:
    fetch('http://puzzle.mead.io/puzzle').then(response => {
        response.json().then(data => {
            console.log(data)
        })
    })
 */



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then(response => {

        response.json().then(data => {

            if (data.error) {

                return messageOne.textContent = data.error
            }

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

        })

    })

})