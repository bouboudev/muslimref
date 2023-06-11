import store from '@/store';
import Vue from 'vue';
import VueRouter from 'vue-router';
// import { getAuth } from 'firebase/auth';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        nameFr: 'Accueil',
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
        nameFr: 'A propos',
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
    //admin
    {
        path: '/admin',
        name: 'admin',
        nameFr: 'Administration',
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue'),
        meta: {
            requiresAuth: true,
            requireRole : 'admin'
        },
    },
    //profilWatch
    {
        path: '/profilWatch/:userId',
        name: 'profilWatch',
        nameFr: 'Profil de l\'utilisateur',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProfilWatchView.vue'),
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

// // verifier le role l'utilisateur si il est admin ou pas
// router.beforeEach((to, from, next) => {
//     //lancer l'action du store getUser
//     store.dispatch('fetchUser');
//     //récupérer l'utilisateur connecté venant du store
//     const user = store.state.user;
//     //si l'utilisateur à le role admin
//     if (to.matched.some((record) => record.meta.role === 'admin')) {
//         //si l'utilisateur n'est pas admin
//         if (user.role !== 'admin') {
//             console.log('vous n\'avez pas les droits pour accéder à cette page');
//             next('/');
//             return;
//         }
//         else {
//             console.log('vous avez les droits pour accéder à cette page', user);
//         }
//     }
//     next();
// });

router.beforeEach(async (to, from, next) => {
    // lancer l'action du store fetchUser et attendre qu'elle soit terminée
    await store.dispatch('fetchUser');
  
    // récupérer l'utilisateur connecté venant du store
    const user = store.state.user;
  
    // si l'utilisateur a le rôle admin
    if (to.matched.some((record) => record.meta.role === 'admin')) {
      // si l'utilisateur n'est pas admin
      if (user.role !== 'admin') {
        console.log("vous n'avez pas les droits pour accéder à cette page");
        next('/');
        return;
      } else {
        console.log("vous avez les droits pour accéder à cette page", user);
      }
    }
  
    next();
  });
  




export default router;
