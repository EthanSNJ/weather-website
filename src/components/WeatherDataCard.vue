<script setup lang="ts">
import { WeatherData } from "../types";

defineProps<{ weatherData: WeatherData }>();

</script>

<template>
  <div id="weatherDataWrapper">
    <p class="title">{{ weatherData.title }}</p>
    <p>Feels like</p>
    <p>{{ weatherData.feelsLike }}°</p>
    <div class="dataColsWrapper">
      <div class="firstColWrapper">
        <div class="data">
          <p>High/Low</p>
          <p>{{ weatherData.maxTemp + "°/" + weatherData.minTemp }}°</p>
        </div>
        <div class="data">
          <p>Humidity</p>
          <p>{{ weatherData.humidity }}%</p>
        </div>
        <div class="data">
          <p>Pressure</p>
          <p>{{ weatherData.pressure }} mb</p>
        </div>
        <div class="data">
          <p>Visibility</p>
          <p>{{ weatherData.visibility }} km</p>
        </div>
      </div>
      <div class="secondColWrapper">
        <div class="data">
          <p>Wind</p>
          <p>{{ weatherData.wind }} km/h</p>
        </div>
        <div class="data">
          <p>Sun</p>
          <p>{{ weatherData.sunrise }} - {{ weatherData.sunset }}</p>
        </div>
        <div class="data">
          <p>UV</p>
          <p>{{ weatherData.uv }}</p>
        </div>
        <div class="data">
          <p>Moon Phase</p>
          <p>{{ weatherData.moonPhase }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#weatherDataWrapper {
  height: 40%;
  width: 50%;
  background-color: #7fc8f8;
  border-radius: 15px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #f9f9f9;
}

.title {
  font-size: 1.4rem;
  font-weight: 500;
}

#weatherDataWrapper > p:nth-child(2) {
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: -2rem;
}

#weatherDataWrapper > p:nth-child(3) {
  font-size: 4rem;
  font-weight: 500;
}

.dataColsWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.firstColWrapper {
  display: flex;
  flex-direction: column;
  width: 45%;
}

.secondColWrapper {
  display: flex;
  flex-direction: column;
  width: 45%;
}

.data {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  font-size: 1.2rem;
}

.firstColWrapper > .data:last-child {
  border-bottom: none;
}

.secondColWrapper > .data:last-child {
  border-bottom: none;
}
</style>
