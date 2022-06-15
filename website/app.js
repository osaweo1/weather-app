//getting various data and assigning variable needed for the weather app
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='
const key = '&appid=9bee080de17b5e909032950248c3560b&units=metric'
const zipCode = document.querySelector('.zipcode')
const temperature = document.querySelector('.temp')
const content = document.querySelector('.content')
const date = document.querySelector('.date')
const error = document.querySelector('.error')
const name = document.querySelector('.name')
const feelings = document.querySelector('.feelings')
const generate = document.querySelector('.generate')
const entryHolder = document.querySelector('.entryHolder')
    //creating a date 
const d = new Date();
const newDate = d.toDateString()

// addEventListener click to search for the weather,using async system
generate.addEventListener('click', (e) => {
        e.preventDefault()
        const getUrl = `${baseUrl}${zipCode.value}${key}`
        getWeather(getUrl)
            .then((data) => {
                postToServer('/add', data)
                    .then(() => {
                        getFromServer('/all')
                    })
            })
    })
    // function to get weather information for an API(e.g Open weather app)
const getWeather = async(getUrl) => {
    const response = await fetch(getUrl)

    try {
        const data = response.json()
        console.log(data)
        return data
    } catch {
        console.log(err)
    }
}


//function to send gotten from open Weather to local server
const postToServer = async(url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(data)

    })
    try {
        const newData = await response.json()
        console.log(newData)
        return newData

    } catch (error) {
        console.log(error)
    }
}

//getting data from local server and diaplaying it in the UI
const getFromServer = async(url) => {
    const request = await fetch(url)
    try {
        const data = await request.json()
        console.log(data)
        if (data.name) {

            temperature.innerHTML = `temperature:${data.main.temp}°C`
            name.innerHTML = `City:${data.name}`
            date.innerHTML = `Date:${newDate}`
            content.innerHTML = `Fellings:${feelings.value}`
            error.style.display = 'none'
            entryHolder.style.display = 'block'
        } else {
            error.innerHTML = `Error:${data.message}<br> Try With Correct Zipcode`
            entryHolder.style.display = 'none'
            error.style.display = 'block'

        }
    } catch (error) {
        console.log('error', error)
    }
}