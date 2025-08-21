<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { oneDayDataInterface } from "../lib/interfaces";

const { daysToRender } = defineProps<{
   daysToRender: oneDayDataInterface[];
}>();

console.log(daysToRender);

const months = [
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
function createDate(str: string, index: number) {
   const date = new Date(str);
   const day = date.getDate();
   const month = months[date.getMonth()];

   const todayTomorrow =
      index === 0 ? "Today," : index === 1 ? "Tommorow," : "";

   return `${todayTomorrow} ${day} ${month}`;
}

const hours = [7, 13, 18, 0];

const dayTime = ["morning", "afternoon", "evening", "nigth"];

const screenWidth = ref();
onMounted(() => {
   console.log(window.innerWidth);
   screenWidth.value = window.innerWidth;
});
</script>

<template>
   <div class="section flex flex-col gap-2">
      <div class="text-2xl">Forecast Details</div>
      <div v-for="(day, index) in daysToRender" class="">
         <div class="">{{ createDate(day.date, index) }}</div>
         <div
            v-for="(hour, index) in hours"
            class="flex justify-between font-medium items-center"
         >
            <span class="w-26">{{ dayTime[index] }}</span>
            <div class="flex items-center">
               {{ Math.round(day.hour[hour].temp_c) + "°" }}
               <img :src="day.hour[hour].condition.icon" alt="" class="w-10" />
            </div>
            <span class="w-14 flex justify-end">{{
               Math.round(day.hour[hour].wind_kph) + " km/h"
            }}</span>
         </div>
      </div>
   </div>
</template>
