<script lang="ts" setup>
import {  ref, watchEffect } from "vue";
import { useUserPosition } from "../store/userPosition";
import Location from "../icons/location.vue";
import { storeToRefs } from "pinia";

const store = useUserPosition();
const { userCity, userCountry } = storeToRefs(store);
const { getUserPosition, setUserPosition } = store;

const isOpen = ref<boolean>(false);
const menu = ref<HTMLElement | null>(null);

const locations: string[] = [
   "Moscow, Russia",
   "Paris, France",
   "New York, USA",
   "Miskhor, Russia",
];

const handleClick = (event: Event) => {
   if (!menu.value?.contains(event.target as Node)) {
      isOpen.value = false;
   }
};
watchEffect(() => {
   if (isOpen.value) {
      document.addEventListener("click", handleClick);
   } else {
      document.removeEventListener("click", handleClick);
   }
});
</script>

<template>
   <div
      class="h-16 flex items-center justify-between px-5 lg:px-20 border-b-1 "
   >
      <span class="text-3xl">Weather</span>
      <div
         v-if="userCity && userCountry"
         class="relative min-w-32 flex items-center gap-1"
         ref="menu"
      >
         <Location class="w-4 h-4 fill-sky-50" />
         <span
            @click="
               () => {
                  isOpen = !isOpen;
               }
            "
            class="cursor-pointer text-xl select-none"
            >{{ userCity + ", " + userCountry }}</span
         >
         <div
            class="location-picker absolute border rounded-2xl top-14 overflow-hidden left-1/2 -translate-x-1/2 w-full bg-primary/30"
            v-if="isOpen"
            @click="
               (event) => {
                  setUserPosition(event);
                  isOpen = false;
               }
            "
         >
            <div class="text-center" @click="getUserPosition">My location</div>
            <div v-for="location in locations">{{ location }}</div>
         </div>
      </div>
   </div>
</template>
