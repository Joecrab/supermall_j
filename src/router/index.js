import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home', 
        component: () => import('../views/home/home.vue')
    },
    {
        path: '/category',
        component: () => import('../views/category/category.vue')
    },
    {
        path: '/car',
        component: () => import('../views/car/car.vue')
    },
    {
        path: '/profile',
        component: () => import('../views/profile/profile.vue')
    },
    {
        path: '/detail/:id',//这是动态路由哟，/：id 要拼接id
        component: () => import('../views/detail/Detail.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;