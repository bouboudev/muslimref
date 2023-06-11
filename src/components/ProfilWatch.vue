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
                md="6"
            >
                <!-- skelleton if !user -->
                <div v-if="!userProfile">
                    <v-skeleton-loader
                        class="mx-auto"
                        max-width="600"
                        type="card-avatar"
                    ></v-skeleton-loader>
                </div>
                <div v-else>
                    <!-- petit bouton retour -->
                    <v-btn
                        small
                        class="ma-2"
                        color="navbarBackground"
                        dark
                        @click="$router.go(-1)"
                    >
                        <v-icon>mdi-arrow-left</v-icon>
                        Retour
                    </v-btn>

                    <v-card class="pa-8">
                        <v-list-item
                            three-line
                            color="rgba(0, 0, 0, .4)"
                            class="d-flex flex-column"
                        >
                            <v-list-item-content v-if="userProfile.firstName">
                                <v-list-item-subtitle>Prénom</v-list-item-subtitle>
                                <v-list-item-title class="text-h6">
                                    {{ userProfile.firstName }}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-content v-if="userProfile.lastName">
                                <v-list-item-subtitle>Nom</v-list-item-subtitle>
                                <v-list-item-title class="text-h6">
                                    {{ userProfile.lastName }}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-content v-if="userProfile.job">
                                <v-list-item-subtitle> Metier ou commerce</v-list-item-subtitle>
                                <v-list-item-title class="text-h6">
                                    {{ userProfile.job }}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-content v-if="userProfile.email">
                                <v-list-item-subtitle> Email</v-list-item-subtitle>
                                <v-list-item-title class="text-h6">
                                    {{ userProfile.email }}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-content v-if="userProfile.number">
                                <v-list-item-subtitle>Numéro de téléphone</v-list-item-subtitle>
                                <v-list-item-title class="text-h6">
                                    {{ userProfile.number }}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-content v-if="userProfile.location">
                                <v-list-item-subtitle>Localisation</v-list-item-subtitle>
                                <v-list-item-title class="text-h6">
                                    {{ userProfile.location }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <!-- v-btn demande de connexion -->
                        <v-btn
                            color="primary"
                            type="submit"
                            @click="sendRequest(userProfile.id)"
                            :disabled="isRequesting"
                        >
                            Demande de connexion
                        </v-btn>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        props: {
            userProfile: Object,
            sendRequest: Function,
            isRequesting: Boolean,
        },
    };
</script>
