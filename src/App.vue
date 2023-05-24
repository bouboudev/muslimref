<template>
    <v-app>
        <v-app-bar
            app
            color="secondary"
            dark
        >
            <!-- logo -->
            <v-img
                src="./assets/logo.png"
                max-height="40"
                max-width="40"
                class="mr-2"
            ></v-img>
            <div>
                <h1>MuslimRef</h1>
            </div>

            <div v-if="isLogin"><router-link to="/">Accueil</router-link> | <router-link to="/about">à propos</router-link> |</div>
            <v-spacer></v-spacer>
            <div v-if="!isLogin">
                <v-btn
                    text
                    @click="goTo('login')"
                >
                    <span class="mr-2">Se connecter</span>
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </div>
            <div v-else>
                <v-btn
                    text
                    @click="signOut"
                >
                    <span class="mr-2">Se déconnecter</span>
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </div>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-btn
                text
                @click="goTo('signup')"
            >
                <span class="mr-2">S'inscrire</span>
                <v-icon>mdi-account-plus</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
    import { auth } from './firebase';
    import 'firebase/auth';
    export default {
        name: 'App',

        data: () => ({
            isLogin: false,
            //
        }),
        mounted() {
            this.setupFirebase();
        },
        methods: {
            goTo(route) {
                if (route === this.$route.name) return;
                this.$router.replace({ name: route });
            },
            setupFirebase() {
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        this.isLogin = true;
                    } else {
                        this.isLogin = false;
                    }
                });
            },
            signOut() {
                auth.signOut().then(() => {
                    this.$router.replace({ name: 'login' });
                });
            },
        },
    };
</script>
