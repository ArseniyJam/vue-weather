export interface currentDataInterface {
   condition: {
      text: string;
      icon: string;
   };
   humidity: number;
   temp_c: number;
   wind_kph: number;
   last_updated: string;
}
// Days
export interface oneDayDataInterface {
   date: string;
   day: {
      avgtemp_c: number;
      maxtemp_c: number;
      mintemp_c: number;
      maxwind_kph: number;
      condition: {
         text: string;
         icon: string;
      };
   };
   hour: {
      condition: {
         text: string;
         icon: string;
      };
      chance_of_rain: number;
      humidity: number;
      temp_c: number;
      time: string;
      wind_kph: number;
   }[];
}
