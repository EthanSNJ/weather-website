<script setup lang="ts">
import { DailyForecast } from "../types";

const props = defineProps<{ dailyForecast: DailyForecast[] }>();
let dateNow = Math.floor(Date.now() / 1000);

</script>

<template>
  <div id="dailyForecastWrapper">
    <div class="dailyForecast" v-for="forecast in props.dailyForecast" :key="forecast.date">
      <p>
        {{ 
          new Date(forecast.date * 1000).getDate() === new Date(dateNow * 1000).getDate() 
          ? "Today" 
          : new Date(forecast.date * 1000).toLocaleDateString("en-US", {weekday: "short"}) + " " + new Date(forecast.date * 1000).getDate()
        }}
      </p>
      <img :src="forecast.icon" />
      <p>{{ forecast.maxTemp + "°C" }}</p>
      <p>{{ forecast.minTemp + "°C" }}</p>
      <p>{{ forecast.precipitationPercentage + "%" }}</p>
    </div>
  </div>
</template>

<style scoped>
#dailyForecastWrapper {
  display: flex;
  flex-direction: row;
  height: 200px;
  width: 50%;
  background-color: #7fc8f8;
  border-radius: 15px;
  padding: 1rem;
  color: #f9f9f9;
  overflow-x: auto;
  font-weight: 500;
}

.dailyForecast {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  border-right: 1px solid lightgray;
  min-width: 33%;
}

.dailyForecast > p:first-child {
  font-size: 1.2rem;
}

#dailyForecastWrapper > .dailyForecast:last-child {
  border-right: none;
}

#dailyForecastWrapper > .dailyForecast:first-child {
  font-weight: 800;
}

@media (max-width: 1100px) {
  #dailyForecastWrapper {
    width: 70%;
  }
}

@media (max-width: 550px) {
  #dailyForecastWrapper {
    width: 90%;
  }
}
</style>
