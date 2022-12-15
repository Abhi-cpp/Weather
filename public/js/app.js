console.log('up and running')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const meassageone = document.querySelector('#one')
const meassagetwo = document.querySelector('#two')
weatherform.addEventListener('submit', (event) => {
    event.preventDefault();

    meassageone.textContent = 'Loading...'
    meassagetwo.textContent = ''

    const location = search.value

    const url = 'https://weather-vyu6.onrender.com/weather?location=' + location

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                meassageone.textContent = data.error
            }
            else {
                meassageone.textContent = data.place
                meassagetwo.textContent = data.forecast
            }
        })
    })
})

