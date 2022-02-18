import mapboxgl from 'mapbox-gl';



let submit = document.querySelector('input:last-child')
// console.log(submit)
let adressInput = document.querySelector('input:first-child')
// console.log(adressInput)
let cloudWeather = document.querySelector('.cloud-weather')

let weather = document.querySelector('.weather')

let weatherTemp = document.querySelector('p:first-child') 
// console.log(weatherTemp)

let weatherTempMin = document.querySelector('p:nth-child(2)') 
// console.log(weatherTempMin)

let weatherTempMax = document.querySelector('p:nth-child(3)') 

let weatherHumidity = document.querySelector('p:last-child')

// let weatherCity = document.querySelector('.city')




const createMap = (coord) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhaXIzMSIsImEiOiJja3pyMnIwdzQwZzBjMm9tdXE4b3ZpNTVpIn0.Zv6GtLpKrEIFNu5xYo8vVA';
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: coord, // starting position [lng, lat]
    zoom: 12 // starting zoom

    });

    const marker = new mapboxgl.Marker()
        .setLngLat(coord)
        .addTo(map);
 }

 submit.addEventListener('click', (e) => {
    //  console.log(adressInput.value)
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/%20${adressInput.value}.json?access_token=pk.eyJ1IjoiaXNhaXIzMSIsImEiOiJja3pyMnIwdzQwZzBjMm9tdXE4b3ZpNTVpIn0.Zv6GtLpKrEIFNu5xYo8vVA`)
    .then((response) => {
        return response.json()
    })
    .then(data => {
        
        // console.log(data.query)
        createMap(data.features[0].center)

        cloudWeather.style.display = "block"

        cloudWeather.addEventListener("click", (e) => {

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.features[0].center[0]}&lon=${data.features[0].center[1]}&appid=c5a9f20285da90ca443fec63d859c9f8`)

            .then((response) => {

                return response.json()
            })
            
            .then(data => {
                
                // console.log(data.main.temp)
                weather.style.display = "flex"
                // weatherCity.innerText = " The temp of " + data.query
                weatherTemp.innerText = "the temp is "  + data.main.temp
                // weatherTempMin = "the temp min is " + data.main.temp_min

            })
        })
        
        
    }
    
 )})

    