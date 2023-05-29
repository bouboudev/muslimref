import Vue from 'vue';
import Vuex from 'vuex';

import router from '../router';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },

        CLEAR_USER(state) {
            state.user = null;
        },
    },
    actions: {
        async login({ commit }, details) {
            const { email, password } = details;
            console.log('router : ', router);

            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('User not found');
                        break;
                    case 'auth/wrong-password':
                        alert('Wrong password');
                        break;
                    default:
                        alert('Something went wrong');
                }

                return;
            }

            commit('SET_USER', auth.currentUser);

            router.push('/');
        },

        async register({ commit }, details) {
            const { email, password } = details;

            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        alert('Email already in use');
                        break;
                    case 'auth/invalid-email':
                        alert('Invalid email');
                        break;
                    case 'auth/operation-not-allowed':
                        alert('Operation not allowed');
                        break;
                    case 'auth/weak-password':
                        alert('Weak password');
                        break;
                    default:
                        alert('Something went wrong');
                }

                return;
            }

            commit('SET_USER', auth.currentUser);

            router.push('/');
        },

        async logout({ commit }) {
            await signOut(auth);

            commit('CLEAR_USER');

            router.push('/login');
        },

        fetchUser({ commit }) {
            auth.onAuthStateChanged(async (user) => {
                if (user === null) {
                    commit('CLEAR_USER');
                } else {
                    commit('SET_USER', user);

                    // call getInformationSheet to get the user's information sheet
                    this.dispatch('getInformationSheet', user.uid);
                    // add informations on the user's profile

                    // if (router.isReady() && router.currentRoute.value.path === '/login') {
                    //     router.push('/');
                    // }
                    if (router.currentRoute.path === '/login') {
                        router.push('/');
                    }
                }
            });
        },
        updateProfileStore({ commit }, details) {
            const { displayName } = details;
            const user = auth.currentUser;
            if (user) {
                updateProfile(auth.currentUser, {
                    displayName,
                }).catch((error) => {
                    console.log(error);
                });
            }

            commit('SET_USER', auth.currentUser);
        },
        async addInformationSheet({ commit }, details) {
            // Add a new document in collection "cities"
            await setDoc(doc(db, 'informationsSheet', auth.currentUser.uid), {
                userId: auth.currentUser.uid,
                userFirstName: details.firstName,
                userLastName: details.lastName,
                userMail : details.email,
                profilCompleted: details.profilCompleted,
            })
                .then((docRef) => {
                    console.log('Fiche de renseignement ajoutée avec succès', docRef);
                })
                .catch((error) => {
                    console.error("Erreur lors de l'ajout de la fiche de renseignement", error);
                });
            commit('SET_USER', auth.currentUser);
        },
        async getInformationSheet({ commit }) {
            const docRef = doc(db, 'informationsSheet', auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              //si la fiche de renseignement existe, on la récupère et on la met dans le store
                const userUpdated = {
                  ...auth.currentUser,
                  ...docSnap.data(),
                };
                commit('SET_USER', userUpdated);
                console.log('Document data:', userUpdated);

            } else {
                // doc.data() will be undefined in this case
                console.log('No such document!');
            }
        },
    },
    modules: {},
});
