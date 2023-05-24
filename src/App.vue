<template>
    <v-app>
        <v-app-bar
            app
            color="secondary"
            dark
        >
            <div class="mr-6">
                <h1>MuslimRef</h1>
            </div>

            <div v-if="isLogin"><router-link to="/">Accueil</router-link> | <router-link to="/about">à propos</router-link> |</div>
            <v-spacer></v-spacer>

            <v-btn
                text
                @click="goTo('profil')"
            >
                <span class="mr-2">Mon profil</span>
                <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <div v-if="!isLogin">
                <v-btn
                    text
                    @click="goTo('signin')"
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
                this.$router.push({ name: route });
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
