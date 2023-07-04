import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    {
        path: '/page1',
        component: () => import('@/views/page1.vue'),
    },
    {
        path: '/page2',
        component: () => import('@/views/page2.vue'),
    }

]
export default createRouter({
    history: createWebHashHistory(),
    routes: routes,
})
