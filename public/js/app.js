

console.log("Client-side javascript file is loaded in index.hbs handlebat template file")

//accesing the html elements from handlebar templates
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
//accesing the html tags   by id-based selector
const message1 = document.querySelector('#demo-1')
const message2 = document.querySelector('#demo-2')



weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()


    const location = search.value

    message1.textContent = 'Loading....!'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})