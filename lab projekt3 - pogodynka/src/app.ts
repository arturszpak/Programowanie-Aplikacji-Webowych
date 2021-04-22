export class App {
    opwApiKey = '32d8e4afdd5f13aae220752fefc6c272';
    cities: string[] = ["kraków", "warszawa", "katowice"];

    constructor() {
        this.appStart();
    }

    appStart(): void{
        
        this.loadLocalStorageCities();
        this.addButtonListener();
    }

    loadLocalStorageCities(){
        // window.localStorage.clear();
        if(localStorage.getItem("cities") === null)
            localStorage.setItem("cities", JSON.stringify(this.cities));

        const storedCities: string[] = [...JSON.parse(localStorage["cities"])];  
        storedCities.forEach(city => this.getCityInfo(city));
    }


    addButtonListener(){
        const addCityBtn: HTMLButtonElement = document.getElementById("addCityBtn") as HTMLButtonElement;
        addCityBtn.addEventListener("click", () => {
            const cityInput: HTMLInputElement = document.querySelector(".weatherApp__input");
            const isValidated = this.validateInputValue(cityInput);
            if(isValidated) this.getCityInfo(cityInput.value.trim());
        })
    }

    validateInputValue(input: HTMLInputElement): boolean{
        let value = input.value;
        if(value === "" || value.length > 55) return false;
        return true;
    }

    async getCityInfo(city: string) {
        const weather: any = await this.getWeather(city);
        if(weather !== undefined){
            this.displayWeatherData(weather);
            this.saveData(weather);
        }
        
    }

    async getWeather(city: string): Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}`;
        
        const weatherResponse = await fetch(openWeatherUrl);
        if(weatherResponse.ok){
            const weatherData = await weatherResponse.json();
            const weatherDetails = {
                cityName: city,
                clouds: weatherData.weather[0].main,
                temperature: weatherData.main.temp,
                pressure: weatherData.main.pressure,
                humidity: weatherData.main.humidity
            }
            return weatherDetails;
        }
        else
            throw new Error("Invalid input");
    }
    saveData(data: any) {
        if(this.cities.includes(data.cityName)) return;
        this.cities.push(data.cityName);
        localStorage.setItem("cities", JSON.stringify(this.cities));
    }

    displayWeatherData(weather: any){
        const htmlPrefix = "weatherApp__cityData__";

        const HTMLWeather: string = `
        <div class="weatherApp__cityData">
			  <span class="weatherApp__cityData__cityName">${(weather.cityName).toUpperCase()}</span>
			  <span class="weatherApp__cityData__clouds">
              Clouds: ${weather.clouds}
			  </span>
			  <span class="weatherApp__cityData__temperature">
                ${Math.round(parseFloat(weather.temperature)-273.15)} celsius
			  </span>
			  <span class="weatherApp__cityData__pressure">
                Pressure: ${weather.pressure} HPA
			  </span>
			  <span class="weatherApp__cityData__humidity">
              Humidity: ${weather.humidity} %
			  </span>
        </div>
        `;

        const cityWrapper: HTMLDivElement = document.querySelector(".weatherApp__dataWrapper");
        cityWrapper.innerHTML += HTMLWeather;
    }


}