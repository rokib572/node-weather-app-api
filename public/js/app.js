const weatherForm = document.querySelector('form')
const searchBox = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchBox.value
    messageOne.textContent = 'Loading Weather Results.....'
    messageTwo.textContent = ''
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})