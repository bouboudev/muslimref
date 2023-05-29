<template>
    <v-container fluid>
        <v-row    justify="center"
            align="center"
            style="height: 100vh">
            <v-col cols="12"
                sm="8"
                md="10">
                <v-data-table
                    :headers="headers"
                    :items="users"
                    :items-per-page="5"
                    class="elevation-1"
                ></v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { db } from '../firebase';
    import { collection, getDocs } from 'firebase/firestore';
import { mapState } from 'vuex';
    export default {
        data() {
            return {
                headers: [
                    { text: 'nom', value: 'userLastName' },
                    { text: 'prenom', value: 'userFirstName' },
                    { text: 'email', value: 'userMail' },
                    { text: 'Profil Validé ?', value: 'profilCompleted' },
                    // { text: 'metier', value: 'metier' },
                    // { text: 'entreprise', value: 'entreprise' },


                ],
                items: [],
                users:[]
                
            };
        },
        mounted() {
            this.getFirestoreCollection();
            
            
        },
        methods: {
            async getFirestoreCollection() {
                const querySnapshot = await getDocs(collection(db, 'informationsSheet'));
                querySnapshot.forEach((doc) => {
                    this.items.push(doc.data());
                });
                this.checkProfilIsCompleted();
            },
            checkProfilIsCompleted() {
                this.items.forEach((item) => {
                    if ( item.profilCompleted) {
                        this.users.push(item);
                        console.log('user :',item);
                    }
                });
            },
        },
        computed: {
            ...mapState(['user']),
            //
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
