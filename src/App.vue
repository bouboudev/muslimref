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
    // import { auth } from './firebase';
    import 'firebase/auth';
import { mapState } from 'vuex';
    export default {
        name: 'App',

        data: () => ({
            //
        }),
        components: {
            Navbar,
        },
        async created() {
            //fetch user to check if user is logged in
            // this.$store.dispatch('fetchUser', auth.currentUser);
            // await this.dispatch('getInformationSheet', this.user.uid);
            // getFirestoreCollectionSignaled();
            
        },
        methods: {
            //
        },
        mounted() {
            this.$store.dispatch('getFirestoreCollectionSignaled');
            // console.log('notification : ', this.notification);
        },
        computed: {
            ...mapState(['user']),
            //
        },
        watch: {},
    };
</script>
<style scoped>

</style>
