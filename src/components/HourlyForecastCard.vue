<script setup lang="ts">
import { computed } from "vue";
import { HourlyForecast } from "../types";

const props = defineProps<{ hourlyForecast: HourlyForecast[] }>();

const dateNow = Math.floor(Date.now() / 1000);
const currentHour = new Date(dateNow * 1000).getHours();
const filteredHourlyForecast = computed(() => {
  return props.hourlyForecast.filter(forecast => {
    const forecastHour = new Date(forecast.time * 1000).getHours();
    return forecastHour >= currentHour;
  });
});

</script>

<template>
  <div id="hourlyForecastWrapper">
    <div class="hourlyForecast" v-for="forecast in filteredHourlyForecast" :key="forecast.time">
      <p>
        {{
          new Date(forecast.time * 1000).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          })
        }}
      </p>
      <img :src="forecast.icon" />
      <p>{{ forecast.temperature + "°C" }}</p>
      <div class="precipitationWrapper">
        <img src="../assets/droplet.svg" alt="droplet">
        <p>{{ forecast.precipitationPercentage + "%" }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#hourlyForecastWrapper {
  display: flex;
  flex-direction: row;
  height: 200px;
  width: 50%;
  background-color: #7fc8f8;
  border-radius: 15px;
  padding: 1rem;
  color: #f9f9f9;
  overflow-x: auto;
}

#hourlyForecastWrapper > .hourlyForecast:first-child {
  font-weight: 800;
}

.hourlyForecast {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  border-right: 1px solid lightgray;
  min-width: 100px;
}

.hourlyForecast > p:first-child {
  font-size: 1.2rem;
}

#hourlyForecastWrapper > .hourlyForecast:last-child {
  border-right: none;
}

.precipitationWrapper {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.precipitationWrapper > img {
  height: 10px;
  width: auto;
  aspect-ratio: 1/1;
}

@media (max-width: 1100px) {
  #hourlyForecastWrapper {
    width: 70%;
  }
}

@media (max-width: 550px) {
  #hourlyForecastWrapper {
    width: 90%;
  }
}
</style>
