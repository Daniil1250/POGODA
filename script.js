
const weatherDiv = document.getElementById('weatherDiv');
const getWeatherBtn = document.getElementById('getWeatherBtn');

const latitude = 55.75;
const longitude = 37.62;

async function getWeather() {
    weatherDiv.innerHTML = '<span class="loading">Загружаю данные...</span>';
    
    try {
      
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        console.log('Отправляем запрос:', url);
        
        const response = await fetch(url);
        
   
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
   
        const data = await response.json();
        console.log('Полученные данные:', data);
        
 
        const temperature = data.current_weather.temperature;
        const windspeed = data.current_weather.windspeed;
        const winddirection = data.current_weather.winddirection;
 
        weatherDiv.innerHTML = `
           <strong>Температура:</strong> ${temperature}°C<br>
             <strong>Скорость ветра:</strong> ${windspeed} км/ч<br>
            <strong>Направление ветра:</strong> ${winddirection}°<br>
            <strong>Время обновления:</strong> ${new Date().toLocaleTimeString()}
        `;
        
    } catch (error) {
    
        weatherDiv.innerHTML = `<span class="error">Ошибка: ${error.message}. Попробуйте позже.</span>`;
        console.error('AJAX Error:', error);
    }
}


getWeatherBtn.addEventListener('click', getWeather);
