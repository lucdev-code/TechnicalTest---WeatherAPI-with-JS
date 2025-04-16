 // crear objecto con las variables que tienen similitud
const variables = {
    formSubmit: document.getElementById('form-get-weather'),
    weather: document.getElementById('weather'),
    icon: document.getElementById('icon'),
    temperature: document.getElementById('temperature'),
    tempmaxmin: document.getElementById('temp-max-min')
}

// crear la function para evitar la arrow function =>
function getWeather(e){
    // prevenimos el recargo de la pagina
    e.preventDefault()

    // guardamos el apikey y el valor que el usuario digite dentro del input de city
    const _apiKey = '9a2df7a60a6b0733b9ea460e26f297e8'
    const cityName = document.getElementById('city').value.trim()

    // verificacion que exista y tenga contenido el elemento
    if(!cityName) return console.error('No existe el elemento o no se añadio un valor dentro del input')

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=es&units=metric&appid=${_apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        // recuperamos los elementos de nuestro html donde se mostrara la informacion
        const elements = {
            icon: document.getElementById('icon'),
            nameCityElement: document.getElementById('nameCity'),
            weatherElement: document.getElementById('weather'),
            temperatureElement: document.getElementById('temperature'),
            tempmaxminElement: document.getElementById('temp-max-min')
        }

        // verificacion que exista cada uno de los elementos
        for(let elm in elements) { if(!elements[elm]) return console.error('Todos los elementos deben de existir') }
        
        // recuperamos la data que se mostrara dentro de los elementos html
        const dataResponse = {
            name: nameCityData,
            weather: [{description:weatherData, icon: iconData}],
            main: {temp: temperatureData, temp_min: tempminData, temp_max: tempmaxData}
        } = data
        
        //verficacion que se obtenga toda la data 
        for(let dataRes in dataResponse) { if(!dataResponse[dataRes]) return console.error('Hubo un problema en obtner todos los datos') }

        const iconUrl = `https://openweathermap.org/img/wn/${dataResponse.weather[0].icon}@2x.png`

        icon.innerHTML = `<img src="${iconUrl}"/>`
        elements.nameCityElement.innerHTML = `${dataResponse.name}`
        elements.weatherElement.innerHTML = `Descripcion: ${dataResponse.weather[0].description}`
        elements.temperatureElement.innerHTML = `Temperatura: ${dataResponse.main.temp}°C`
        elements.tempmaxminElement.innerHTML = `Se espera una temperatura min de: ${dataResponse.main.temp_min} y una temperatura max de: ${dataResponse.main.temp_max}`
    })
    .catch(err => { console.error(err) })
}

document.addEventListener('DOMContentLoaded', () => {

    for(let one in variables){ if(!variables[one]) console.error('Todos los elementos deben de existir') }

    variables.formSubmit.addEventListener('submit', getWeather)
})