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
                    :items="items"
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
    export default {
        data() {
            return {
                headers: [
                    { text: 'nom', value: 'nom' },
                    { text: 'prenom', value: 'prenom' },
                    { text: 'email', value: 'mail' },
                    { text: 'metier', value: 'metier' },
                    { text: 'entreprise', value: 'entreprise' },

                ],
                items: [],
            };
        },
        mounted() {
            this.getFirestoreCollection();
        },
        methods: {
            async getFirestoreCollection() {
                const querySnapshot = await getDocs(collection(db, 'test'));
                querySnapshot.forEach((doc) => {
                    this.items.push(doc.data());
                });
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
