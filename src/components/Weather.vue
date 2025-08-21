<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useUserPosition } from "../store/userPosition";
import type {
   currentDataInterface,
   oneDayDataInterface,
} from "../lib/interfaces";
import { storeToRefs } from "pinia";
import WeatherCurrent from "./WeatherCurrent.vue";
import WeatherForecast from "./WeatherForecast.vue";
import WeatherDetails from "./WeatherDetails.vue";

const key = import.meta.env.VITE_WEATHER_API_KEY;

const store = useUserPosition();
const { userCity } = storeToRefs(store);

const currentData = ref<currentDataInterface | null>(null);
const daysData = ref<oneDayDataInterface[] | null>(null);

const daysCount = ref<number>(2);
const daysToRender = computed((): oneDayDataInterface[] | [] => {
   if (daysData?.value?.length) {
      return daysCount.value === daysData.value.length
         ? daysData.value
         : daysData.value?.slice(0, daysCount.value);
   }
   return [];
});

const weatherKeywords = ["rain", "cloud", "sun", "thunder", "overcast"];

watch(userCity, async (newVal) => {
   if (newVal) {
      const response = await fetch(
         `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${userCity.value}&days=3&lang=eu`
      );
      const data = await response.json();

      currentData.value = data.current;
      daysData.value = data.forecast.forecastday;
      console.log(daysData.value);

      weatherKeywords.forEach((word) => {
         if (currentData.value?.condition.text.toLowerCase().includes(word)) {
            document.body.classList.remove(...weatherKeywords);
            document.body.classList.add(word);
         }
      });
   }
});
</script>

<template>
   <div class="px-4 flex flex-col gap-5 mb-40">
      <WeatherCurrent
         v-if="daysData?.length"
         :currentData
         :dayData="daysData[0]"
      />
      <WeatherForecast v-model="daysCount" :daysToRender />
      <WeatherDetails :daysToRender />
   </div>
</template>
