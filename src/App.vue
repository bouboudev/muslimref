<template>
    <v-app>
        <v-app-bar
            app
            color="primary"
            dark
        >
            <div class="d-flex align-center"></div>
            <v-btn
                text
                @click="goTo('/')"
            >
                <span class="mr-2">MuslimREF</span>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
                text
                @click="goTo('signin')"
            >
                <span class="mr-2">Se connecter</span>
                <v-icon>mdi-account</v-icon>
            </v-btn>
            <!-- séparation ligne -->
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
    export default {
        name: 'App',

        data: () => ({
            //
        }),
        methods: {
            goTo(route) {
                this.$router.push({ name: route });
            },
        },
    };
</script>
