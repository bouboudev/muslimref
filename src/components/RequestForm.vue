<template>
    <v-container fluid>
        <!-- card color with user length -->

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
                <!-- Tableau 1 -->
                
                <div
                v-if="!isLoading1">
                <v-card-title> <v-icon x-large> mdi-account-plus </v-icon> Mes demandes de connexion : </v-card-title>
                <v-data-table
                    
                
                    :headers="table1Headers"
                    :items="requests"
                    sort-by="calories"
                    class="elevation-1"
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
                                    class="pointer"
                                    @click="acceptAccessRequest(item)"
                                >
                                    <v-icon small>mdi-check</v-icon>
                                    <v-list-item-title>Accepter la demande</v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                    class="pointer"
                                    @click="rejectAccessRequest(item)"
                                >
                                    <v-icon small>mdi-close</v-icon>
                                    <v-list-item-title>Refuser la demande</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </template>
                </v-data-table>
                </div>


                <v-skeleton-loader type="table" v-else></v-skeleton-loader>
            </v-col>

            <v-col
                cols="12"
                sm="8"
                md="10"
            >
            <div
                v-if="!isLoading2">
                <!-- Tableau 2 -->
                <v-card-title> <v-icon x-large> mdi-account-check </v-icon> Mes connexions acceptées : </v-card-title>

                <v-data-table
                    
                    :headers="table2Headers"
                    :items="requestsAccepted"
                    sort-by="calories"
                    class="elevation-1"
                >
                </v-data-table>
            </div>
                <v-skeleton-loader type="table" v-else></v-skeleton-loader>
            </v-col>

            <v-col
                cols="12"
                sm="8"
                md="10"
            >
            <div
                v-if="!isLoading3">
                <!-- Tableau 3 -->
                <v-card-title> <v-icon x-large> mdi-account-cancel </v-icon> Mes connexions refusées : </v-card-title>

                <v-data-table
                    :headers="table3Headers"
                    :items="requestsRejected"
                    sort-by="calories"
                    class="elevation-1"
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
                                    class="pointer"
                                    @click="acceptAccessRequest(item)"
                                >
                                    <v-icon small>mdi-check</v-icon>
                                    <v-list-item-title>Accepter la demande</v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                    class="pointer"
                                    @click="rejectAccessRequest(item)"
                                >
                                    <v-icon small>mdi-close</v-icon>
                                    <v-list-item-title>Refuser la demande</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </template>
                </v-data-table>
            </div>
                <v-skeleton-loader type="table" v-else></v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { db } from '@/firebase';
    import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
    // import { doc, getDoc } from 'firebase/firestore';
    export default {
        data() {
            return {
                isLoading1: true,
                isLoading2: true,
                isLoading3: true,
                commonHeaders: [
                    { text: 'Nom', value: 'lastName' },
                    { text: 'Prénom', value: 'firstName' },
                    { text: 'Metier', value: 'job' },
                ],
                table1Headers: [],
                table2Headers: [],
                table3Headers: [],
                requests: [],
                requestsAccepted: [],
                requestsRejected: [],

                loading: false,
            };
        },
        created() {
            // Initialisation des en-têtes pour chaque table
            this.table1Headers = [...this.commonHeaders, { text: 'Actions', value: 'actions' }];
            this.table2Headers = [...this.commonHeaders];
            this.table3Headers = [...this.commonHeaders];
        },
        mounted() {
            this.loading = true;
            this.getAccessRequests();
            this.getAccessRequestsAccepted();
            this.getAccessRequestsRejected();
        },
        methods: {
            goToProfil(id) {
                this.$router.push(`/profilWatch/${id}`);
            },

            //demandes
            async getAccessRequests() {
                const targetUserId = this.$route.params.userId;
                const targetUserProfileRef = doc(db, 'informationsSheet', targetUserId);
                const targetUserProfileSnapshot = await getDoc(targetUserProfileRef);
                const targetUserProfileData = targetUserProfileSnapshot.data();
                if (targetUserProfileData && targetUserProfileData.requests && Array.isArray(targetUserProfileData.requests)) {
                    if (targetUserProfileData) {
                        const accessRequests = targetUserProfileData.requests;
                        this.requests = accessRequests;
                        console.log('demandes :', accessRequests);
                        this.isLoading1 = false;
                        return accessRequests || [];
                    } else {
                        return [];
                    }
                }
                 else {
                    console.log('demandes acceptées :', []);
                    this.isLoading1 = false;
                    return [];
                }
            },
            //demandes acceptées
            async getAccessRequestsAccepted() {
                const targetUserId = this.$route.params.userId;
                const targetUserProfileRef = doc(db, 'informationsSheet', targetUserId);
                const targetUserProfileSnapshot = await getDoc(targetUserProfileRef);
                const targetUserProfileData = targetUserProfileSnapshot.data();
                if (
                    targetUserProfileData &&
                    targetUserProfileData.requestsAccepted &&
                    Array.isArray(targetUserProfileData.requestsAccepted)
                ) {
                    if (targetUserProfileData) {
                        const accessRequests = targetUserProfileData.requestsAccepted;
                        this.requestsAccepted = accessRequests;
                        console.log('demandes acceptées :', accessRequests);
                        this.isLoading2 = false;
                        return accessRequests || [];
                    } else {
                        this.isLoading2 = false;

                        return [];
                    }
                    
                }
                 else {
                    console.log('demandes acceptées :', []);
                    this.isLoading2 = false;
                    return [];
                }
            },
            //demandes refusées
            async getAccessRequestsRejected() {
                const targetUserId = this.$route.params.userId;
                const targetUserProfileRef = doc(db, 'informationsSheet', targetUserId);
                const targetUserProfileSnapshot = await getDoc(targetUserProfileRef);
                const targetUserProfileData = targetUserProfileSnapshot.data();
                if (
                    targetUserProfileData &&
                    targetUserProfileData.requestsRejected &&
                    Array.isArray(targetUserProfileData.requestsRejected)
                ) {
                    if (targetUserProfileData) {
                        const accessRequests = targetUserProfileData.requestsAccepted;
                        this.requestsRejected = accessRequests;
                        console.log('demandes refusées :', accessRequests);
                        this.isLoading3 = false;
                        return accessRequests || [];
                    } else {
                        this.isLoading3 = false;
                        return [];
                    }
                }
                else {
                    console.log('demandes refusées :', []);
                    this.isLoading3 = false;
                    return [];
                }
            },
            //accepter la demande
            async acceptAccessRequest(item) {
                const userId = this.$route.params.userId;

                const targetUserProfileRef = doc(db, 'informationsSheet', userId);
                const targetUserProfileSnapshot = await getDoc(targetUserProfileRef);
                const targetUserProfileData = targetUserProfileSnapshot.data();

                // Utilisateur actuel qui a envoyé la demande
                const requester = targetUserProfileData.requests.find((demande) => demande.id === item.id);
                const requesterId = requester ? requester.id : null;
                console.log('requesterId', requesterId);

                if (targetUserProfileData && requesterId) {
                    try {
                        // Supprimer l'objet demandeur de la liste des demandes
                        await updateDoc(targetUserProfileRef, {
                            requests: arrayRemove(requester),
                            requestsAccepted: arrayUnion(requester),
                        });

                        // Effectuer d'autres opérations ici, si nécessaire
                        // ...
                        this.getAccessRequests();
                        this.getAccessRequestsAccepted();

                        console.log("Demande d'accès acceptée avec succès");
                    } catch (error) {
                        console.error("Erreur lors de l'acceptation de la demande d'accès", error);
                    }
                } else {
                    console.warn("La demande d'accès n'existe pas ou a déjà été traitée");
                }
            },
            //refuser la demande
            async rejectAccessRequest(item) {
                const userId = this.$route.params.userId;

                const targetUserProfileRef = doc(db, 'informationsSheet', userId);
                const targetUserProfileSnapshot = await getDoc(targetUserProfileRef);
                const targetUserProfileData = targetUserProfileSnapshot.data();

                // Utilisateur actuel qui a envoyé la demande
                const requester = targetUserProfileData.requests.find((demande) => demande.id === item.id);
                const requesterId = requester ? requester.id : null;
                console.log('requesterId', requesterId);

                if (targetUserProfileData && requesterId) {
                    try {
                        // Supprimer l'objet demandeur de la liste des demandes
                        await updateDoc(targetUserProfileRef, {
                            requests: arrayRemove(requester),
                            requestsRejected: arrayUnion(requester),
                        });
                    } catch (error) {
                        console.error('Erreur lors du refus de la demande ', error);
                    }
                } else {
                    console.warn("La demande de refus n'existe pas ou a déjà été traitée");
                }
            },
        },
    };
</script>

<style></style>
