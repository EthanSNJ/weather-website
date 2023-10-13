import { defineStore } from "pinia";
import { FavoriteCity } from "../types";


export const useFavoriteStore = defineStore("favorite", {
  state: () => {
    return {
      favoriteCities: [] as FavoriteCity[],
    };
  },
  actions: {
    addFavoriteCity(city: FavoriteCity) {
      this.favoriteCities.push(city);
    },
    removeFavoriteCity(city: FavoriteCity) {
      this.favoriteCities = this.favoriteCities.filter(
        (favoriteCity) => favoriteCity !== city
      );
    },
    isFavoriteCity(city: FavoriteCity) {
      return this.favoriteCities.includes(city);
    }
  },
  persist: true,
});
