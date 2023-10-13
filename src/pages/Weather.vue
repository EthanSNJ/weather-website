<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";
import MainWeatherCard from "../components/MainWeatherCard.vue";
import WeatherDataCard from "../components/WeatherDataCard.vue";
import HourlyForecastCard from "../components/HourlyForecastCard.vue";
import DailyForecastCard from "../components/DailyForecastCard.vue";
import {
  Weather,
  MainWeather,
  WeatherData,
  HourlyForecast,
  DailyForecast,
} from "../types";
import { useFavoriteStore } from "../store/pinia";

let input = ref("");
let suggestion = ref({
  label: "",
  city: "",
  formatted: "",
});
let weather = ref<Weather>();
let shouldDisplaySuggestion = ref(false);
const favoriteStore = useFavoriteStore();

watch(input, (value) => {
  if (value.length >= 3) {
    shouldDisplaySuggestion.value = true;
    axios
      .get(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${
          input.value
        }&access_token=${
          import.meta.env.VITE_MAPBOX
        }&session_token=12345678coucou&types=country,city`
      )
      .then((response) => {
        suggestion.value.label =
          response.data.suggestions[0].feature_type === "country"
            ? response.data.suggestions[0].name
            : response.data.suggestions[0].name +
              ", " +
              response.data.suggestions[0].context.country.name;
        suggestion.value.city = response.data.suggestions[0].name;
        response.data.suggestions[0].feature_type === "country"
          ? (suggestion.value.formatted = response.data.suggestions[0].name)
          : (suggestion.value.formatted =
              response.data.suggestions[0].name +
              ", " +
              response.data.suggestions[0].place_formatted);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

const searchCity = (city: string) => {
  input.value = city;
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    params: {
      q: city,
      days: "3",
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      weather.value = mapWeather(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const mapMainCardData = (weatherApiData: any) => {
  const mainCardData: MainWeather = {
    title: suggestion.value.formatted,
    time: weatherApiData.current.last_updated_epoch,
    temperature: weatherApiData.current.temp_c,
    icon: "https://" + weatherApiData.current.condition.icon,
    status: weatherApiData.current.condition.text,
  };
  return mainCardData;
};

const mapWeatherData = (weatherApiData: any) => {
  const weatherData: WeatherData = {
    title: "Weather today in " + suggestion.value.formatted,
    feelsLike: weatherApiData.current.feelslike_c,
    minTemp: weatherApiData.forecast.forecastday[0].day.mintemp_c,
    maxTemp: weatherApiData.forecast.forecastday[0].day.maxtemp_c,
    humidity: weatherApiData.current.humidity,
    pressure: weatherApiData.current.pressure_mb,
    visibility: weatherApiData.current.vis_km,
    wind: weatherApiData.current.wind_kph,
    sunrise: weatherApiData.forecast.forecastday[0].astro.sunrise,
    sunset: weatherApiData.forecast.forecastday[0].astro.sunset,
    uv: weatherApiData.current.uv,
    moonPhase: weatherApiData.forecast.forecastday[0].astro.moon_phase,
  };
  return weatherData;
};

const mapHourlyForecast = (weatherApiData: any) => {
  const hourlyForecast: HourlyForecast[] = [];
  for (let i = 0; i < 24; i++) {
    const hourlyForecastData: HourlyForecast = {
      time: weatherApiData.forecast.forecastday[0].hour[i].time_epoch,
      temperature: weatherApiData.forecast.forecastday[0].hour[i].temp_c,
      icon:
        "https://" +
        weatherApiData.forecast.forecastday[0].hour[i].condition.icon,
      precipitationPercentage:
        weatherApiData.forecast.forecastday[0].hour[i].chance_of_rain,
    };
    hourlyForecast.push(hourlyForecastData);
  }
  return hourlyForecast;
};

const mapDailyForecast = (weatherApiData: any) => {
  const dailyForecast: DailyForecast[] = [];
  for (let i = 0; i < 3; i++) {
    const dailyForecastData: DailyForecast = {
      date: weatherApiData.forecast.forecastday[i].date_epoch,
      minTemp: weatherApiData.forecast.forecastday[i].day.mintemp_c,
      maxTemp: weatherApiData.forecast.forecastday[i].day.maxtemp_c,
      icon:
        "https://" + weatherApiData.forecast.forecastday[i].day.condition.icon,
      precipitationPercentage:
        weatherApiData.forecast.forecastday[i].day.daily_chance_of_rain,
    };
    dailyForecast.push(dailyForecastData);
  }
  return dailyForecast;
};

const mapWeather = (weatherApiData: any) => {
  const weather: Weather = {
    mainWeather: mapMainCardData(weatherApiData),
    weatherData: mapWeatherData(weatherApiData),
    hourlyForecast: mapHourlyForecast(weatherApiData),
    dailyForecast: mapDailyForecast(weatherApiData),
  };
  return weather;
};

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.id !== "city-input") {
    shouldDisplaySuggestion.value = false;
  }
});
</script>

<template>
  <div id="wrapper">
    <div class="favsWrapper">
      <div class="fav" v-for="city in favoriteStore.favoriteCities" @click="searchCity(city)">
        <p>{{ city }}</p>
      </div>
    </div>
    <div id="input-container">
      <input
        id="city-input"
        type="text"
        placeholder="Search for a city"
        v-model="input"
        @input="input = ($event.target as HTMLInputElement)?.value"
      />
      <span
        id="suggestion"
        v-if="input.length >= 3 && shouldDisplaySuggestion"
        @click="searchCity(suggestion.city)"
        >{{ suggestion.label }}</span
      >
    </div>
    <MainWeatherCard v-if="weather" :mainWeather="weather.mainWeather" />
    <WeatherDataCard v-if="weather" :weatherData="weather.weatherData" />
    <HourlyForecastCard
      v-if="weather"
      :hourlyForecast="weather.hourlyForecast"
    />
    <DailyForecastCard v-if="weather" :dailyForecast="weather.dailyForecast" />
  </div>
</template>

<style scoped>
#wrapper {
  width: 100%;
  min-height: 100vh;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 40px;
}

.favsWrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: #7fc8f8;
  display: flex;
  align-items: flex-start;
  overflow-x: scroll;
}

.fav {
  height: 100%;
  min-width: 200px;
  cursor: pointer;
  border-right: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9f9f9;
}

.fav > p {
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
}

#city-input {
  width: 100%;
  outline: none;
  height: 3rem;
  border-radius: 3rem;
  border: none;
  padding: 0 1rem;
}

#suggestion {
  position: absolute;
  top: 105%;
  left: 50%;
  transform: translateX(-50%);
  height: 3rem;
  width: 85%;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 5px;
  cursor: pointer;
  /* border: 1px solid black; */
}
</style>
