import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserPosition = defineStore("position", () => {
   const userCountry = ref<string>("");
   const userCity = ref<string>("");

   async function getUserPosition() {
      const response = await fetch("http://ip-api.com/json/");
      const data = await response.json();
      if (data.status === "success") {
         userCountry.value = data.country;
         userCity.value = data.city;
      } else {
         userCountry.value = "Russia";
         userCity.value = "Moscow";
      }
   }
   function setUserPosition(event: Event) {
      if (!event.target) return;
      const target = event.target as HTMLElement;
      if (target.textContent) {
         userCity.value = target.textContent.split(",")[0];
         userCountry.value = target.textContent.split(",")[1];
      }
   }
   getUserPosition();

   return { userCountry, userCity, setUserPosition, getUserPosition };
});
