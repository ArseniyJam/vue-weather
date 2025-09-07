<script setup lang="ts">
import Calendar from "../icons/calendar.vue";
import type { oneDayDataInterface } from "../lib/interfaces";

const daysCount = defineModel();
const { daysToRender } = defineProps<{ daysToRender: oneDayDataInterface[] }>();

const daysOfWeek = [
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
   "Sunday",
];
function getCurrentDay(str: string) {
   const date = new Date(str).getDate();
   const day = new Date(str).getDay();
   return `${daysOfWeek[day]}, ${date}`;
}
</script>

<template>
   <div class="section">
      <div class="flex justify-between text-2xl items-center mb-1">
         <span>Next Forecast</span>
         <div class="flex gap-1 items-center font-medium">
            <Calendar class="w-6 h-6 fill-current" />
            <button
               class="border w-10 rounded-l-full"
               :class="daysCount === 2 ? 'gradient' : ''"
               @click="daysCount = 2"
            >
               2
            </button>
            <button
               class="border w-10 rounded-r-full -translate-x-1.5"
               :class="daysCount === 3 ? 'gradient' : ''"
               @click="daysCount = 3"
            >
               3
            </button>
         </div>
      </div>
      <div
         v-for="day in daysToRender"
         class="flex justify-between items-center"
         :key="day.date"
      >
         <span class="w-26">{{ getCurrentDay(day.date) }}</span>
         <img :src="day.day.condition.icon" alt="icon" class="w-12" />
         <div class="flex gap-2">
            <span>{{ Math.round(day.day.mintemp_c) + "°" }}</span>
            <span>{{ Math.round(day.day.maxtemp_c) + "°" }}</span>
         </div>
      </div>
   </div>
</template>
