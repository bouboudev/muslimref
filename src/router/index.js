import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUpView from '../views/SignUpView.vue';
import LoginView from '../views/LoginView.vue';
import { auth } from '../firebase'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            requiresAuth: true,
        },
    },
    //page sign up
    {
        path: '/signup',
        name: 'signup',
        component: SignUpView,
    },
    //page sign in
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
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


// router.beforeEach((to, from, next) => {
//   const authenticatedUser = auth.currentUser;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
//   if ( requiresAuth && ! authenticatedUser ) {
//       alert("Vous devez être connecté pour accéder à cette page");
//       next("signin");
//   }
//   else {
//       next();
//   }
// });


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("login");
  } else {
    next();
  }
});

export default router;
