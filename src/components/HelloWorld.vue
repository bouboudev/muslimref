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
            <div v-if=" user && user.profilCompleted">
                
                <v-card>
                    <v-card-title>
                        Liste des utilisateurs
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
                        :items-per-page="10"
                        class="elevation-0"
                        :search="search"
                        :loading="loading"
                    >
                        <!-- v slot action -->
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-menu>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        icon
                                        v-on="on"
                                    >
                                        <v-icon
                                            color="grey_dark"
                                            class="pointer"
                                            >mdi-dots-vertical</v-icon
                                        >
                                    </v-btn>
                                </template>
                                <v-list dense>
                                    <!-- consulter le profil -->
                                    <v-list-item
                                        class="pointer"
                                        @click="goToProfil(item.id)"
                                    >
                                        <v-icon small>mdi-account-plus</v-icon>
                                        <v-list-item-title>Consulter le profil</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                        v-if="item.number"
                                        class="pointer"
                                        @click="copyElement(item.number)"
                                    >
                                    <v-icon small>mdi-phone</v-icon>
                                        <v-list-item-title>copier le numero de téléphone</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                    v-if="item.email"
                                        class="pointer"
                                        @click="copyElement(item.email)"
                                    >
                                    <v-icon small>mdi-mail</v-icon>

                                        <v-list-item-title>copier le mail</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                        class="pointer"
                                        @click="copyElement(item)"
                                    >
                                    <v-icon small>mdi-account</v-icon>
                                        <v-list-item-title><signal :userSignaled="item"/></v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                            
                        </template>
                    </v-data-table>
                </v-card>
            </div>
            <div v-else class="text-center">
                <v-card>
                    <v-card-text class="headline">
                        Votre profil doit etre validé par un administrateur pour acceder à la liste des utilisateurs.
                    </v-card-text>
                </v-card>

            </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import signal from './Signal.vue';
    import { db } from '../firebase';
    import { collection, getDocs } from 'firebase/firestore';
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                headers: [
                    { text: 'Nom', value: 'lastName' },
                    { text: 'Prénom', value: 'firstName' },
                    { text: 'Email', value: 'email' },
                    { text: 'Metier', value: 'job' },
                    { text: 'Numero', value: 'number' },
                    // location
                    { text: 'Localisation', value: 'location' },
              
                    { text: 'Actions', value: 'actions' },

                    // { text: 'entreprise', value: 'entreprise' },
                ],
                items: [],
                users: [],
                search: '',
                loading: false,
            };
        },
        components: {
            signal,
        },
        mounted() {
            this.getFirestoreCollection();
        },
        methods: {
            async getFirestoreCollection() {
                this.loading = true;
                const querySnapshot = await getDocs(collection(db, 'informationsSheet'));
                querySnapshot.forEach((doc) => {
                    this.items.push(doc.data());
                    this.loading = false;
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
            copyElement(item) {
                //copy to clipboard
                navigator.clipboard.writeText(item);
                console.log('copied', item);
            },
            goToProfil(id) {
                this.$router.push(`/profilWatch/${id}`);
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
