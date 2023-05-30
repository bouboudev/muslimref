<template>
    <v-container fluid>
        <v-row
            justify="center"
            align="center"
            style="height: 100vh"
        >
            <v-col
                cols="12"
                sm="8"
                md="10"
            >
                <v-card>
                    <v-card-title>
                        Muslim
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Rechercher"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                        :headers="headers"
                        :items="users"
                        :items-per-page="5"
                        class="elevation-1"
                        :search="search"
                    >
                    </v-data-table>
                </v-card>
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
                    { text: 'nom', value: 'lastName' },
                    { text: 'prenom', value: 'firstName' },
                    { text: 'email', value: 'email' },
                    { text: 'metier', value: 'job' },
                    { text: 'Profil Validé ?', value: 'profilCompleted' },
                    // { text: 'entreprise', value: 'entreprise' },
                ],
                items: [],
                users: [],
                search: '',
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
                    if (item.profilCompleted) {
                        this.users.push(item);
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
<style scoped></style>
