<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";

let input = ref("");
let suggestion = ref({
  label: "",
  city: "",
});
let accessKey = import.meta.env.VITE_POSITION_STACK_KEY;

watch(input, (value) => {
  if (value.length >= 3) {
    console.log("searching for", value);
    axios
      .get(
        `http://api.positionstack.com/v1/forward?access_key=${accessKey}&query=${input.value}`
      )
      .then((response) => {
        console.log(response.data);
        suggestion.value.label = response.data.data[0].label;
        suggestion.value.city = response.data.data[0].name;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("suggestion", suggestion);
  }
});

const searchCity = (city: string) => {
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
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
</script>

<template>
  <div id="wrapper">
    <div id="input-container">
      <input
        id="city-input"
        type="text"
        v-model="input"
        @input="input = ($event.target as HTMLInputElement)?.value"
      />
      <span
        id="suggestion"
        v-if="input.length >= 3"
        @click="searchCity(suggestion.city)"
        >{{ suggestion.label }}</span
      >
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid black;
}
</style>
