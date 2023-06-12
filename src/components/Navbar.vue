<template>
    <v-app-bar
        v-if="!$route.meta.hideNavigation"
        app
        color="navbarBackground"
        class="textNavbar--text"
    >
        <v-img
            src="../assets/image.png"
            height="50px"
            width="150px"
            contain
        ></v-img>

        <!-- <v-toolbar-title 
        class="mx-2"
        >
            <router-link
                :class="{ 'active-link': $route.path === '/' }"
                to="/"
                >Accueil</router-link
            >
        </v-toolbar-title>
        <v-toolbar-title
        class="mx-2"
        >
            <router-link
                :class="{ 'active-link': $route.path === '/about' }"
                to="/about"
                >à propos</router-link
            >
        </v-toolbar-title> -->
        <v-tabs color="textNavbar">
            <v-tab
                v-for="route in routes"
                :key="route.path"
                :to="route.path"
            >
                <router-link
                    :class="{ 'active-link': $route.path === route.path, routerLinkInactive: $route.path !== route.path }"
                    :to="route.path"
                    >{{ route.nameFr }}</router-link
                >
            </v-tab>
            <v-badge
                v-if="totalOfItems && user.role && user.role === 'admin'"
                color="red"
                :content="totalOfItems"
                class="mt-8 ml-n2"
            >
            </v-badge>
        </v-tabs>
        <!-- <v-toolbar-title
            v-for="route in routes"
            :key="route.path"
            class="mx-2"
            color="red"
        >
            <router-link
                :class="{ 'active-link': $route.path === route.path }"
                :to="route.path"
                >{{ route.nameFr }}</router-link
            >
        </v-toolbar-title> -->

        <v-spacer></v-spacer>

        <!-- <v-btn
            text
            @click="goTo('profil')"
        >
            <span class="mr-2">Mon profil</span>
            <v-icon>mdi-account</v-icon>
        </v-btn> -->
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>

        <!-- <v-btn
                text
                @click="signOut"
            >
                <span class="mr-2">Se déconnecter</span>
                <v-icon>mdi-logout</v-icon>
            </v-btn> -->

        <!-- @click="goTo('profil')" -->

        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <div>
                    <v-list-item
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-list-item-avatar>
                            <v-img
                                :src="imageUrl"
                                alt="avatar"
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ user ? user.firstName : '' }}
                                {{ user ? user.lastName : '' }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ user ? user.job : '' }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </template>
            <v-list>
                <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    @click="performAction(item)"
                >
                    <v-icon>{{ item.icon }}</v-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
    import { mapState } from 'vuex';
    import { auth, db } from '../firebase';
    import { collection, onSnapshot, query, where } from 'firebase/firestore';

    import 'firebase/auth';
    export default {
        name: 'App',

        data: () => ({
            imageUrl: 'https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png',
            numberOfItems: 0,
            numberOfItemsBis: 0,
            totalOfItems: 0,
            items: [
                { title: 'Accéder à mon profil', icon: 'mdi-account', action: 'goTo', params: ['profil'] },
                { title: "Demande d'accès", icon: 'mdi-account-arrow-left', action: 'goTo', params: ['request'] },
                { title: 'Se deconnecter', icon: 'mdi-logout', action: 'signOut' },
            ],

            //
        }),

        mounted() {
            // this.$store.dispatch('getFirestoreCollectionSignaled');
            this.fetchItemCount();
        },

        methods: {
            goTo(route) {
                if (typeof route === 'string') {
                    route = { name: route };
                }

                if (route.name === this.$route.name) return;

                // route with user id
                if (route.name === 'request') {
                    const user = this.$store.state.user;
                    this.$router.push({ name: route.name, params: { userId: user.id } });
                } else {
                    this.$router.push(route);
                }
            },

            signOut() {
                auth.signOut().then(() => {
                    this.$router.replace({ name: 'login' });
                });
            },
            async fetchItemCount() {
                try {
                    const collectionRef = collection(db, 'profilesSignaled');
                    const q = query(collectionRef, where('canceled', '==', false));
                    onSnapshot(q, (querySnapshot) => {
                        this.numberOfItems = querySnapshot.size;

                        this.totalOfItems = this.numberOfItems + this.numberOfItemsBis;
                    });

                    const collectionRefNew = collection(db, 'informationsSheet');
                    const qNew = query(collectionRefNew, where('profilCompleted', '==', false));
                    onSnapshot(qNew, (querySnapshot) => {
                        this.numberOfItemsBis = querySnapshot.size;
                        this.totalOfItems = this.numberOfItems + this.numberOfItemsBis;
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            performAction(item) {
                if (item.action === 'goTo') {
                    this.goTo(item.params[0]);
                    // corriger bug v tabs
                } else if (item.action === 'signOut') {
                    this.signOut();
                }
            },
        },
        computed: {
            ...mapState(['user']),

            routes() {
                const userRole = this.user && this.user.role ? this.user.role : ''; // Obtenez le rôle de l'utilisateur ici, par exemple depuis le stockage local

                return this.$router.options.routes.filter((route) => {
                    if (
                        (route.name === 'admin' && userRole !== 'admin') || // Vérifier si le nom est 'admin' et l'utilisateur n'a pas le rôle 'admin'
                        (route.meta.requireRole && route.meta.requireRole !== userRole) // Vérifier si la route a une exigence de rôle et si le rôle de l'utilisateur ne correspond pas
                    ) {
                        return false; // Cacher la route si l'une des conditions est vraie
                    }

                    return !route.meta.hideNavigation && route.name !== 'profil' && route.name !== 'profilWatch' && route.name !== 'request'; // Afficher la route si aucune des conditions ci-dessus n'est vraie
                });
            },
        },
        watch: {},
    };
</script>
<style scoped>
    .active-link {
        color: #ffffff !important;
    }
    .routerLinkInactive {
        color: #01352c !important;
    }
</style>
