import Vue from 'vue';
import Vuex from 'vuex';

import router from '../router';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, addDoc, getDoc, collection, onSnapshot, query } from 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_NOTIFICATION(state, notification) {
            state.notification = notification;
        },
        CLEAR_USER(state) {
            state.user = null;
        },
        CONSOLE(hello) {
            console.log(' console du store :', hello);
        },
    },
    actions: {
        async login({ commit }, details) {
            const { email, password } = details;

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

            commit('CONSOLE', details);

            router.push('/');
        },

        async register({ commit }, details) {
            const { email, password } = details;

            try {
                await createUserWithEmailAndPassword(auth, email, password);
                // create a new document in the collection firebase
                this.dispatch('addInformationSheet', details);
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

            commit('SET_USER', details);
            console.log('details', details);

            router.push('/');
        },

        async logout({ commit }) {
            await signOut(auth);

            commit('CLEAR_USER');

            router.push('/login');
        },

        async fetchUser({ commit }) {
            auth.onAuthStateChanged(async (user) => {
                if (user === null) {
                    commit('CLEAR_USER');
                } else {
                    // call getInformationSheet to get the user's information sheet
                    commit('SET_USER', user);
                    await this.dispatch('getInformationSheet', user.uid);
                    console.log('user fetchUser :', user);
                    // add informations on the user's profile

                    // if (router.isReady() && router.currentRoute.value.path === '/login') {
                    //     router.push('/');
                    // }
                    // si j'actualise une page qui n'est pas le login, je reste sur la page
                    if (router.currentRoute.path === '/login') {
                        console.log('je pousse vers le home car login');
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
                id: auth.currentUser.uid,
                firstName: details.firstName,
                lastName: details.lastName,
                email: details.email,
                number: details.number,
                job: details.job,
                profilCompleted: details.profilCompleted ? details.profilCompleted : false,
            })
                .then((docRef) => {
                    console.log('Fiche de renseignement ajoutée avec succès', docRef);
                })
                .catch((error) => {
                    console.error("Erreur lors de l'ajout de la fiche de renseignement", error);
                });
            commit('SET_USER', details);
        },
        async validateProfileSheet({ commit }, details) {
            await setDoc(doc(db, 'informationsSheet', details.id), {
                id: details.id,
                firstName: details.firstName,
                lastName: details.lastName,
                email: details.email,
                number: details.number,
                job: details.job,
                profilCompleted: details.profilCompleted ? details.profilCompleted : false,
            })
                .then((docRef) => {
                    console.log('Profilvalidé avec succès', docRef);
                })
                .catch((error) => {
                    console.error('Erreur lors de la validation du profil', error);
                });
            commit('console', details);
        },
        async getInformationSheet({ commit }, uid) {
            const docRef = doc(db, 'informationsSheet', uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                //si la fiche de renseignement existe, on la récupère et on la met dans le store
                const userUpdated = {
                    ...auth.currentUser,
                    ...docSnap.data(),
                };
                commit('SET_USER', userUpdated);

                console.log('getInformationSheet :', userUpdated);
            } else {
                // doc.data() will be undefined in this case
                console.log('No such document!');
            }
        },
        //signaler un profil et setDoc(doc(db, 'profilesSignaled', details.id), {
        async signalProfile({ commit }, details) {
            await addDoc(collection(db, 'profilesSignaled'), {
                userSignaledId: details.id,
                userSignaledFirstName: details.firstName,
                userSignaledLastName: details.lastName,
                userSignaledEmail: details.email,
                userSignaledMessage: details.message,
                AuthorId: details.signalAuthorId,
                firstNameAuthor: details.firstNameAuthor,
                canceled: false,
            })
                .then((docRef) => {
                    console.log('Profil signalé avec succès', docRef);
                })
                .catch((error) => {
                    console.error('Erreur lors du signalement du profil', error);
                });
            commit('CONSOLE', details);
        },
        async getFirestoreCollectionSignaled({ commit }) {
            const collectionRef = collection(db, 'profilesSignaled');
            const q = query(collectionRef);

            onSnapshot(q, (snapshot) => {
                const newData = [];
                snapshot.forEach((doc) => {
                    newData.push(doc.data());
                });

                commit('SET_NOTIFICATION', newData.length);
                console.log('getFirestoreCollectionSignaled :', newData);
            });
        },

        async deleteProfilFirebase({ commit }, details) {
            console.log('details', details);
            commit('CONSOLE', details);
            //retrouver l'uilisateur avec son id
            // const auth = getAuth(details.userSignaledId);
            // const user = auth.currentUser;
            // console.log('user', user);

            // afficher la collection users :
            const collectionRef = collection(db, 'users');
            const q = query(collectionRef);
            onSnapshot(q, (snapshot) => {
                const newData = [];
                snapshot.forEach((doc) => {
                    newData.push(doc.data());
                });
                console.log('getFirestoreCollectionSignaled :', newData);
            });

            // await deleteUser(user)
            //     .then(() => {
            //         // supprimé sa fiche d'utilisateur dans la collection informationsSheet
            //         deleteDoc(doc(db, 'informationsSheet', details.userSignaledId)).then(() => {
            //             console.log('Fiche de renseignement supprimée');
            //         });
            //         console.log('Utilisateur supprimé');
            //     })
            //     .catch((error) => {
            //         // Une erreur s'est produite lors de la suppression de l'utilisateur
            //         console.error("Erreur lors de la suppression de l'utilisateur :", error);
            //     });
        },

        async cancelProfilSignaled({ commit }, details) {
            console.log('details cancel profil signaled', details);
            commit('CONSOLE', details);
            //ajouter le champs canceled à true dans la collection profilesSignaled
            await setDoc(doc(db, 'profilesSignaled', details.userSignaledId), {
                ...details,
                canceled: true,
            })
                .then((docRef) => {
                    console.log('Profil signalé avec succès', docRef);
                })
                .catch((error) => {
                    console.error('Erreur lors du signalement du profil', error);
                });
        },
    },
    modules: {},
});
