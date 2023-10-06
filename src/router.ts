import { createRouter, createWebHistory } from "vue-router";
import Search from './pages/search/index.vue'
import Favorites from './pages/favorites/index.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Search
        },
        {
            path: '/favs',
            component: Favorites
        }
    ]
})