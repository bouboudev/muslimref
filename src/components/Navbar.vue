<template>
    <v-app-bar
        v-if="!$route.meta.hideNavigation"
        app
        color="secondary"
        dark
    >
        <div class="mr-6">
            <h1>MuslimRef</h1>
        </div>

        <div>
            <router-link
                :class="{ 'active-link': $route.path === '/' }"
                to="/"
                >Accueil</router-link
            >
            |
            <router-link
                :class="{ 'active-link': $route.path === '/about' }"
                to="/about"
                >à propos</router-link
            >
            |
        </div>
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
        <div>
            <!-- <v-btn
                text
                @click="signOut"
            >
                <span class="mr-2">Se déconnecter</span>
                <v-icon>mdi-logout</v-icon>
            </v-btn> -->

            <v-list-item
                @click="goTo('profil')"
            >
                <!-- avat -->
                <v-list-item-avatar>
                    <v-img
                        :src="imageUrl"
                        alt="avatar"
                    ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ userConnected.lastName }}
                        {{ userConnected.firstName }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ userConnected.job }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </div>
    </v-app-bar>
</template>

<script>
    import { auth } from '../firebase';
    import 'firebase/auth';
    export default {
        name: 'App',

        data: () => ({
            imageUrl: 'https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png',

            //
        }),
    
        methods: {
            goTo(route) {
                if (route === this.$route.name) return;
                this.$router.push({ name: route });
            },
            signOut() {
                auth.signOut().then(() => {
                    this.$router.replace({ name: 'login' });
                });
            },
        },
        computed: {
            userConnected() {
                return this.$store.state.user;
            },
            //
        },
        watch: {},
    };
</script>
<style scoped>
    .active-link {
        color: #ffffff !important;
    }
    .routerLinkInactive {
        color: #000000 !important;
    }
</style>
