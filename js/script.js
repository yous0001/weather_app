let row =document.querySelector("header .row");


async function getWeather(location="cairo"){
    let result=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=484e8d5714d84a29bae94433242707&q=${location}&days=7`);
    console.log(result);
    let data=await result.json();
    console.log("data",data);
    
}
getWeather()