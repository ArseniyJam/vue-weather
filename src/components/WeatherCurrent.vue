<script lang="ts" setup>
import type { oneDayDataInterface } from "../lib/interfaces";

const { currentData, dayData } = defineProps(["currentData", "dayData"]);

const monthNames = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];

function createDate(str: string) {
   const date = new Date(str);
   const day = date.getDate();

   const month = monthNames[date.getMonth()];
   return `${month}, ${day}`;
}

function get4HoursArray(arr: oneDayDataInterface) {
   const date = new Date(currentData.last_updated).getHours();

   const hours =
      date >= 20 ? [20, 21, 22, 23] : [date, date + 1, date + 2, date + 3];

   const result = [];
   for (const item of hours) {
      result.push(arr.hour[item]);
   }
   return result;
}
</script>

<template>
   <main class="mt-2 flex flex-col gap-5">
      <div class="flex flex-col items-center justify-center">
         <img
            :src="currentData?.condition.icon"
            alt="weather icon"
            class="w-40"
         />
         <div class="text-5xl">{{ Math.round(currentData?.temp_c) + "°" }}</div>
      </div>
      <div class="flex justify-center gap-10 text-xl font-medium">
         <span>Min: {{ dayData && Math.round(dayData.day.mintemp_c) }}</span>
         <span>Max: {{ dayData && Math.round(dayData.day.maxtemp_c) }}</span>
      </div>
      <div
         class="w-full h-12 bg-primary/80 rounded-full mx-auto text-xl flex justify-between px-6 items-center"
      >
         <span>Humidity: {{ currentData?.humidity }} %</span>
         <span>Wind: {{ currentData?.wind_kph }} km/h</span>
      </div>

      <div class="section">
         <div class="flex justify-between text-2xl font-medium">
            <span>Today</span>
            <span>{{ dayData && createDate(dayData.date) }}</span>
         </div>
         <div class="flex justify-between mt-4">
            <div
               v-for="(item, index) in get4HoursArray(dayData)"
               class="flex flex-col items-center"
               :key="index"
            >
               <span>{{ Math.round(item.temp_c) }}</span>
               <img :src="item.condition.icon" alt="icon" />
               <span>{{ item.time.split(" ")[1] }}</span>
            </div>
         </div>
      </div>
   </main>
</template>
