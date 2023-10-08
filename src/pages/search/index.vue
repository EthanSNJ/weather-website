<script setup lang="ts">
import { ref, watch } from "vue";
let input = ref("");
watch(input, (value) => {
  if (value.length >= 3) {
    console.log("searching for", value);
  }
});
</script>

<template>
  <div>search</div>
  <div id="input-container">
    <input id="city-input" type="text" v-model="input" @input="input = $event.target.value" />
    <span id="proposition" v-if="input.length >= 3">proposition</span>
  </div>
</template>

<style scoped>
#input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
}

#city-input {
  width: 100%;
  outline: none;
}

#proposition {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid black;
}
</style>
