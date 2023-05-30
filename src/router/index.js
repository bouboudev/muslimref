import Vue from 'vue';
import VueRouter from 'vue-router';
// import { getAuth } from 'firebase/auth';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    //page sign up
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/SignUpView.vue'),
        meta: { hideNavigation: true },
    },
    //page sign in
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
        meta: { hideNavigation: true },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    //profil
    {
        path: '/profil',
        name: 'profil',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProfilView.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});


// AVANT
// router.beforeEach((to, from, next) => {
//     const auth = getAuth();
//     if (to.path === '/login' && auth.currentUser) {
//         next('/');
//         return;
//     }

//     if (to.matched.some((record) => record.meta.requiresAuth) && !auth.currentUser) {
//         next('/login');
//         return;
//     }

//     next();
// });

// router.beforeEach((to, from, next) => {
//     if (to.path === from.path) {
//       // La navigation est redondante, donc tu peux simplement retourner
//       return;
//     }
  
//     const auth = getAuth();
//     if (to.path === '/login' && auth.currentUser) {
//       next('/');
//       return;
//     }
  
//     if (to.matched.some((record) => record.meta.requiresAuth) && !auth.currentUser) {
//       next('/login');
//       return;
//     }
  
//     next();
//   });

  


export default router;
