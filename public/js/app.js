console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.getElementById('m1')
const m2 = document.querySelector('#m2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    console.log('testing')
    m1.textContent = 'Loading...'
    m2.textContent = ''
    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
            m1.textContent = data.error
        }
        else{
            console.log(data.location)
            m1.textContent = data.location
            console.log(data.forecast)
            m2.textContent = data.forecast
        }
    })
})
})