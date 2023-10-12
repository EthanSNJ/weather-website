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
      <p>{{ forecast.precipitationPercentage + "%" }}</p>
    </div>
  </div>
</template>

<style scoped>
#hourlyForecastWrapper {
  display: flex;
  flex-direction: row;
  height: 20%;
  width: 50%;
  background-color: #7fc8f8;
  border-radius: 15px;
  padding: 1rem;
  color: #f9f9f9;
  overflow-x: auto;
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


#hourlyForecastWrapper > .hourlyForecast:last-child {
  border-right: none;
}
</style>
