const apiKey = 'd211f6b14ade4b58be6181553261411'; 
const apiUrl = 'https://api.weatherapi.com/v1';

const inp = document.querySelector('input');
const searchBtn = document.querySelector('.search-btn');
const locationBtn = document.querySelector('.locationBtn');

const temperature = document.querySelector('.temperature-value');
const description = document.querySelector('.description');
const weatherIcon = document.querySelector('.current-weather-icon');

const [vis, humidity, uv, cloudCover] = document.querySelectorAll('.weather-metric-value');
const history = document.querySelector('.hourly-history').lastElementChild;

const unitToggel = document.querySelector('.unit-toggel');

let [weatherData, pastData, latitude, longitude] = [null, null, null, null]; 

unitToggel.addEventListener('click', (event) => {
    const btn = event.target;
    if(btn.tagName != 'BUTTON') return;
    
    const unit = btn.textContent.trim();
    if (unit === localStorage.getItem('convert')) return;
    
    localStorage.setItem('convert', unit);
    
    unitToggel.querySelector('.unitBtn-active').classList.remove('unitBtn-active');
    btn.classList.add('unitBtn-active');
    
    if(weatherData) {
        currentUpdate(weatherData);
    }

    if (pastData) {
        historyUpdate(pastData);
    }
});

const todayDate = () => {
    const now = new Date();
    const currentDate = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0')
    ].join('-');
    return currentDate;
}

searchBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const city = inp.value.trim();
    if (!city) return;
    localStorage.setItem('city', city);

    const ok = await fetchWeather(
        `${apiUrl}/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`,
        `${apiUrl}/history.json?key=${apiKey}&q=${encodeURIComponent(city)}&date=${todayDate()}`
    )

    if(!ok) {
         alert('Could not fetch weather for your location.');
         return;
    }

    document.querySelector('main').classList.replace('hide', 'visible');
    currentUpdate(weatherData);
    historyUpdate(pastData);
    showCountryName(city);
});

showCountryName = (city) => {
    let heading = document.querySelector('h2');
    if (!heading) {
        heading = document.createElement('h2');
        weatherIcon.before(heading);
    }
    heading.textContent = city;
}

locationBtn.addEventListener('click', async (event) => {   

    const pr = await getLocationCoordinate();
    console.log('fetched location');
    latitude = pr.coords.latitude;
    longitude = pr.coords.longitude;
    
    if ((latitude == null) && (longitude == null)) {
        alert('Cannot fetch the locaion of user....');
        return;
    }

    const ok = await fetchWeather(
        `${apiUrl}/current.json?key=${apiKey}&q=${latitude},${longitude}`,
        `${apiUrl}/history.json?key=${apiKey}&q=${latitude},${longitude}&date=${todayDate()}`
    )

    if(!ok) {
         alert('Could not fetch weather for your location.');
         return;
    }

    document.querySelector('main').classList.replace('hide', 'visible');
    currentUpdate(weatherData);
    showCountryName();
    historyUpdate(pastData);
});

async function fetchWeather(query1, query2) {

    const [cresponse, presponse] = await Promise.all([
        getData(query1),
        getData(query2)
    ]);

    if (!cresponse || !presponse) {
        return false;
    }

    weatherData = cresponse.current;
    pastData = presponse.forecast.forecastday[0];
    return true;
}

async function getLocationCoordinate(){
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(position);
            },
            
            (error) => {
                reject(error.message);
            },

            {enableHighAccuracy: true, timeout: 10000, maximumAge: 0}
        );
    });
}

function currentUpdate(data) {

    // Current Weather Informtion Update
    temperature.textContent = `${localStorage.getItem('convert') === '°C'? data.temp_c : data.temp_f} ${localStorage.getItem('convert')}`;
    description.textContent = data.condition.text;
    weatherIcon.setAttribute('src', data.condition.icon.replace('//', 'https://'));

    // Current Other Weather Informtion Update
    vis.textContent = data.vis_km;
    humidity.textContent = data.humidity;
    uv.textContent = data.uv;
    cloudCover.textContent = data.cloud;
}

function historyUpdate(pastData) {
    const lastfivehourdata = pastData.hour.slice(
        new Date().getHours() - 5,
        new Date().getHours()
    );
    history.innerText = '';
    for(let i = 4; i >= 0; i--) {
        const el = document.createElement('div');
        el.classList.add('past-weather');

        const time = document.createElement('p');
        const date = new Date(lastfivehourdata[i].time.replace(' ', 'T'));
        time.textContent = date.toLocaleTimeString([], {
            hour: 'numeric'
        });

        const temp = document.createElement('p');
        temp.classList.add('past-temperature');
        temp.textContent = `${localStorage.getItem('convert') === '°C' ? lastfivehourdata[i].temp_c : lastfivehourdata[i].temp_f} ${localStorage.getItem('convert')}`;
        
        const condition = document.createElement('p');
        condition.textContent = lastfivehourdata[i].condition.text;

        el.append(time, temp, condition);

        history.append(el);
    }
}

async function getData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('API Error:', error.message);
        return null;
    }
}

function loadapp() {
    if(localStorage.getItem('convert') === '°F') {
        unitToggel.lastElementChild.classList.add('unitBtn-active');
    }
    else {
        unitToggel.firstElementChild.classList.add('unitBtn-active');
    }

    inp.value = localStorage.getItem('city');
    searchBtn.dispatchEvent(new Event('click', () => {}));
}

document.addEventListener('DOMContentLoaded', () => {   
    console.log('Successfully Loaded');
    loadapp();
});