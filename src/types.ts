export type Weather = {
  mainWeather: MainWeather;
  weatherData: WeatherData;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
};

export type MainWeather = {
  title: string;
  time: number;
  temperature: number;
  icon: string;
  status: string;
};

export type WeatherData = {
  title: string;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  pressure: number;
  visibility: number;
  wind: number;
  sunrise: string;
  sunset: string;
  uv: number;
  moonPhase: string;
};

export type HourlyForecast = {
    time: string;
    temperature: number;
    icon: string;
    precipitationPercentage: number;
}

export type DailyForecast = {
    date: string;
    maxTemp: number;
    minTemp: number;
    icon: string;
    precipitationPercentage: number;
}