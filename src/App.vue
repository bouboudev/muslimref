<template>
    <v-app>
        <Navbar />
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import Navbar from './components/Navbar'
    import { auth } from './firebase';
    import 'firebase/auth';
    export default {
        name: 'App',

        data: () => ({
            //
        }),
        components: {
            Navbar,
        },
        beforeMount() {
            //fetch user to check if user is logged in
            this.$store.dispatch('fetchUser', auth.currentUser);
            
        },
        methods: {
            //
        },
        computed: {
            //
        },
        watch: {},
    };
</script>
<style scoped>

</style>
