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
                <div v-if="loading">
                    <div>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="4"
                                v-for="n in 3"
                                :key="n"
                            >
                                <v-skeleton-loader
                                    type="avatar, list-item-three-line, actions"
                                    class="ma-4"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                    </div>
                </div>
                <div v-else>
                    <div v-if="user && user.profilCompleted">
                        <v-card
                            :loading="loading"
                            class="pa-5"
                        >
                            <template slot="progress">
                                <v-row
                                    justify="center"
                                    align="center"
                                    style="height: 100%"
                                >
                                    <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                    >
                                        <v-progress-circular
                                            indeterminate
                                            size="100"
                                            width="10"
                                            color="primary"
                                        ></v-progress-circular>
                                    </v-col>
                                </v-row>
                            </template>
                            <v-card-title v-if="user">
                                Liste des utilisateurs
                                <v-spacer></v-spacer>
                                <v-text-field
                                    v-model="searchTerm"
                                    append-icon="mdi-magnify"
                                    single-line
                                    hide-details
                                    label="Recherche"
                                    clearable
                                    @clear="searchTerm = ''"
                                ></v-text-field>
                            </v-card-title>

                            <div class="mt-6">
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
                                            v-if="user"
                                            v-model="currentPage"
                                            :length="Math.ceil(filteredUsers.length / itemsPerPage)"
                                            @input="onPageChange"
                                            color="navbarBackground"
                                        ></v-pagination>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card>
                    </div>
                    <div
                        class="text-center"
                        v-else
                    >
                        <v-card>
                            <v-card-text class="headline">
                                Votre profil doit être validé par un administrateur pour accéder à la liste des utilisateurs
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
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
