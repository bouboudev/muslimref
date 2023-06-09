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
                <div v-if="user && user.profilCompleted">
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
                                            <v-list-item-title>Copier le numéro de téléphone</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item
                                            v-if="item.email"
                                            class="pointer"
                                            @click="copyElement(item.email)"
                                        >
                                            <v-icon small>mdi-mail</v-icon>
                                            <v-list-item-title>Copier l'e-mail</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item
                                            class="pointer"
                                            @click="copyElement(item)"
                                        >
                                            <v-icon small>mdi-account</v-icon>
                                            <v-list-item-title><signal :userSignaled="item" /></v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </template>
                        </v-data-table>
                    </v-card>

                    <div class="mt-6">
                        <v-text-field
                            v-model="searchTerm"
                            label="Recherche"
                            clearable
                            @clear="searchTerm = ''"
                        ></v-text-field>
                        <v-row>
                            <v-col
                                v-for="user in displayedUsers"
                                :key="user.id"
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <ProfilCardWall
                                    :user="user"
                                    @click="goToProfil(user.id)"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-pagination
                                    v-model="currentPage"
                                    :length="Math.ceil(filteredUsers.length / itemsPerPage)"
                                    @input="onPageChange"
                                    color="primary"
                                ></v-pagination>
                            </v-col>
                        </v-row>
                    </div>
                </div>
                <div
                    v-else
                    class="text-center"
                >
                    <v-card>
                        <v-card-text class="headline">
                            Votre profil doit être validé par un administrateur pour accéder à la liste des utilisateurs
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import signal from './Signal.vue';
    import ProfilCardWall from './ProfilCardWall.vue';
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
                currentPage: 1, // Page actuelle
                itemsPerPage: 9, // Nombre d'éléments par page
                searchTerm: '',
            };
        },
        components: {
            signal,
            ProfilCardWall,
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
            onPageChange(page) {
                this.currentPage = page;
            },
        },
        computed: {
            ...mapState(['user']),
            filteredUsers() {
                const searchTerm = this.searchTerm ? this.searchTerm.toLowerCase() : '';
                return this.users.filter((user) => {
                    // Filtrez les utilisateurs en fonction des critères de recherche
                    return (
                        user.firstName.toLowerCase().includes(searchTerm) ||
                        user.lastName.toLowerCase().includes(searchTerm) ||
                        user.job.toLowerCase().includes(searchTerm)
                    );
                });
            },
            displayedUsers() {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;

                // Vérifier si une recherche est en cours
                if (this.searchTerm) {
                    // Retourner tous les utilisateurs sans pagination
                    return this.filteredUsers;
                } else {
                    // Filtrer les utilisateurs en fonction des critères de recherche
                    const filteredUsers = this.filteredUsers;

                    // Paginer les résultats filtrés
                    return filteredUsers.slice(startIndex, endIndex);
                }
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
