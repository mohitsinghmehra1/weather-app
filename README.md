# 🌤️ Weather App

A clean, responsive weather app built with vanilla HTML, CSS, and JavaScript. Search any city or use your current location to see live conditions, the last 5 hours of weather history, and key metrics like visibility, humidity, UV index, and cloud cover. Powered by [WeatherAPI.com](https://weatherapi.com).

---

## ✨ Features

- **🔍 City search:** Get current weather for any city worldwide.
- **📍 Use current location:** Detects your position via the browser Geolocation API.
- **🌡️ °C / °F toggle:** Switch temperature units instantly without refetching data.
- **🕐 Hourly history:** View temperature and conditions for the last 5 hours.
- **📊 Weather metrics:** Track visibility, humidity, UV index, and cloud cover.
- **📱 Responsive design:** Scales down smoothly for tablets and small phones.

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (Flexbox, Grid, gradients, media queries)
- **JavaScript** (ES6+, `async/await`, Fetch API, Geolocation API)
- **WeatherAPI.com** (`current.json` and `history.json` endpoints)
- **Google Fonts** (Poppins)

---

## 📁 Project Structure

```text
weather-app/
├── app.js
├── images/
│   ├── cloudy.png
│   ├── magnifying-glass-solid-full.svg
│   ├── output-onlinepngtools.png
│   ├── 10480648.png
│   ├── humidity.png
│   ├── uv-index.png
│   └── full-moon-halloween-night-sky-covered-by-clouds.png
├── static/
│   └── style.css
├── templates/
│   └── index.html
└── README.md
```

> **Note:** `index.html` references `../static/style.css`, `../images/...`, and `../app.js`, so make sure to keep this folder layout (or update the paths accordingly).

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com
cd weather-app
```

### 2. Get a free API key
1. Sign up at [WeatherAPI.com](https://weatherapi.com).
2. Copy your API key from the dashboard.

### 3. Add your API key
Open `app.js` and replace the placeholder key at the top with your own:
```javascript
const apiKey = "YOUR_API_KEY_HERE";
```

### 4. Run the app
Open `templates/index.html` directly in your browser, or run it using a local server (such as the **Live Server** extension in VS Code).

---

## 📖 Usage

1. **Search by city:** Type a city name into the search bar and click the search button.
2. **Use your location:** Click **Use current location** and allow location access when prompted by your browser.
3. **Change units:** Click **°C** or **°F** to toggle between Celsius and Fahrenheit.

---

## 🔌 API Endpoints Used

| Endpoint | Purpose |
| :--- | :--- |
| `GET /v1/current.json?key=KEY&q=QUERY` | Fetches current weather conditions |
| `GET /v1/history.json?key=KEY&q=QUERY&date=YYYY-MM-DD` | Fetches hourly data for today (used for the last 5 hours) |

*Note: `QUERY` can be either a city name or `latitude,longitude` coordinates.*

---

## 🧩 How It Works

- `fetchWeather()` calls both API endpoints in parallel using `Promise.all`.
- `currentUpdate()` renders the current temperature, weather condition, icon, and metrics.
- `historyUpdate()` slices the last 5 hours from today's hourly data and builds the history cards.
- Unit toggling re-renders directly from the stored data, so no extra API calls are made.

---

## 🗺️ Roadmap / Known Limitations

- [ ] Fix hourly history during the first 5 hours after midnight (currently only pulls today's data)
- [ ] Show loading and error states in the UI instead of `alert()`
- [ ] Move the API key to a backend or environment variable
- [ ] Switch the API URL to `https://`
- [ ] Add unit labels for visibility (`km`) and percentages (`%`) for humidity/cloud cover after updates
- [ ] Add a 5-day forecast
- [ ] Remember the last searched city and preferred temperature unit

---

## 👤 Author

**Mohit Singh Mehra** – [@mohitsinghmehra1](https://github.com)
