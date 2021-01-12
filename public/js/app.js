const weatherForm = document.querySelector('form')
const searchName = document.querySelector('input')
const messageAddress = document.querySelector('#message-1')
const messageWeather = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = searchName.value
  
    messageAddress.textContent = 'Loading...'
    messageWeather.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageAddress.textContent = data.error
            } else {
                messageAddress.textContent = `Weather for ${data.location}`
                messageWeather.textContent = data.weather
                console.log(`forecast loaded`)
            }
        })
    })
})