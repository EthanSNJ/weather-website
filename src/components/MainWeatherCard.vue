<script setup lang="ts">
import { MainWeather } from "../types";

defineProps<{ mainWeather: MainWeather }>();

const formatUnixTimestampToHHMM = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  // Adjust hours for CEST (Central European Summer Time)
  const cestOffset = 2; // CEST is UTC+2
  const cestHours = (hours + cestOffset) % 24;

  const formattedHours =
    cestHours < 10 ? `0${cestHours}` : cestHours.toString();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

  return `${formattedHours}:${formattedMinutes} ${ampm} CEST`;
};
</script>

<template>
  <div id="mainWeatherWrapper">
    <p>
      {{
        mainWeather.title +
        " As of " +
        formatUnixTimestampToHHMM(mainWeather.time)
      }}
    </p>
    <div class="temperatureIconWrapper">
      <div class="temperatureStatusWrapper">
        <p>{{ mainWeather.temperature + "°" }}</p>
        <p>{{ mainWeather.status }}</p>
      </div>
      <img :src="mainWeather.icon" />
    </div>
  </div>
</template>

<style scoped>
#mainWeatherWrapper {
  margin-top: 3.5rem;
  height: 180px;
  width: 50%;
  background-color: #7fc8f8;
  border-radius: 15px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  color: #f9f9f9;
}

#mainWeatherWrapper > p:first-child {
  font-size: 1.4rem;
  font-weight: 500;
}

.temperatureIconWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80%;
}

.temperatureIconWrapper > img {
  height: 100%;
  width: auto;
  aspect-ratio: 1/1;
}

.temperatureStatusWrapper {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
    justify-content: center;
}
.temperatureStatusWrapper > p:first-child {
  font-size: 4rem;
  font-weight: 600;
  margin-bottom: -30%;
}

.temperatureStatusWrapper > p:nth-child(2) {
  font-size: 1.5rem;
  font-weight: 500;
}

@media (max-width: 1100px) {
  #mainWeatherWrapper {
    width: 70%;
  }
}

@media (max-width: 880px) {
  #mainWeatherWrapper {
    height: 230px;
  }
}

@media (max-width: 550px) {
  #mainWeatherWrapper {
    width: 90%;
  }
}
</style>
