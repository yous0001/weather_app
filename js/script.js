let row =document.querySelector("header .row");
let searchLocation=document.getElementById("location-form")
let data=[]

async function getWeather(location){
    let result=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=484e8d5714d84a29bae94433242707&q=${location}&days=7`);
    data=await result.json();
    display()
    console.log("data",data);
    
}
function display(){

    let weather=data.forecast.forecastday
    const date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = days[date.getDay()];
    let nextday= days[(date.getDay()+1)%7];
    let next2day= days[(date.getDay()+2)%7];
    
    let dayDate=`${date.getDate()}${months[date.getMonth()]}`;
    let cartona=`
    <div class="col-lg-4" id="today">
                    <div class="item-title">
                        <div class="d-flex justify-content-between align-items-center">
                            <p>${day}</p>
                            <p>${dayDate}</p>
                        </div>
                    </div>
                    <div class="item-body p-3">
                        <p>${data.location.name}</p>
                        <div class="today-weather">
                            <p id="temp" class="today-temp">${data.current.temp_c}<sup>o</sup>C</p>
                            <div class="today-icon">
                                <img src="http:${data.current.condition.icon}" width="90" height="90">
                            </div>
                        </div>
                        <p class="today-status">${data.current.condition.text}</p>
                        <div class="today-details">
                            <span>
                                <img src="./imgs/icon-umberella.png"> 20%
                            </span>
                            <span>
                                <img src="./imgs/icon-wind.png">${data.current.wind_kph} km/h
                            </span>
                            <span>
                                <img src="./imgs/icon-compass.png"> East
                            </span>
                        </div>

                    </div>

                </div>
                <div class="col-lg-4 item-two">
                    <div class="item-title">
                        <div class="d-flex justify-content-center align-items-center">
                            <p>${nextday}</p>
                        </div>
                    </div>
                    <div class="item-body p-3">
                        <div class="item-body-content text-center p-5">
                            <img src="https:${weather[1].day.condition.icon}" class="pb-4">
                            <div class="max-degree">
                                ${weather[1].day.maxtemp_c}<sup>o</sup>C
                            </div>
                            <div class="min-degree">
                                ${weather[1].day.mintemp_c}<sup>o</sup>C
                            </div>
                            <div class="day-status">
                            ${weather[1].day.condition.text}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="item-title">
                        <div class="d-flex justify-content-center align-items-center">
                            <p>${next2day}</p>
                        </div>
                    </div>
                    <div class="item-body p-3">
                        <div class="item-body-content text-center p-5">
                            <img src="https:${weather[2].day.condition.icon}" class="pb-4">
                            <div class="max-degree">
                                ${weather[2].day.maxtemp_c}<sup>o</sup>C
                            </div>
                            <div class="min-degree">
                                ${weather[2].day.mintemp_c}<sup>o</sup>C
                            </div>
                            <div class="day-status">
                            ${weather[2].day.condition.text}
                            </div>
                        </div>
                    </div>
                </div>
    `
    row.innerHTML=cartona
}


async function search(){
    if(searchLocation.value.length>=3)
        await getWeather(searchLocation.value)
}

function getLocation() {
    const successCallback = (position) => {
        var crd = position.coords; 
        var lat = crd.latitude.toString(); 
        var lng = crd.longitude.toString(); 
        var coordinates = [lat, lng]; 
        console.log(`Latitude: ${lat}, Longitude: ${lng}`); 
        getCity(coordinates); 
        return; 
    };
    
    const errorCallback = (error) => {
        console.log(error);
    };
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    async function getCity(coordinates) { 

        var lat = coordinates[0]; 
        var lng = coordinates[1]; 
        getWeather(`${lat},${lng}`)
    } 
}
getLocation()
