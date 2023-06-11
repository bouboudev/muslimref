<template>
    <div>
        <v-card
            class="pa-5"
            @click="goToProfil(user.id)"
        >
            <v-row>
                <v-col cols="10">
                    <v-avatar size="100">
                        <v-img src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png" />
                    </v-avatar>

                    <v-list-item
                        two-line
                        color="rgba(0, 0, 0, .4)"
                    >
                        <v-list-item-content v-if="user.firstName">
                            <v-list-item-subtitle>Prénom</v-list-item-subtitle>
                            <v-list-item-title class="text-h6">
                                {{ user.firstName }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        two-line
                        color="rgba(0, 0, 0, .4)"
                    >
                        <v-list-item-content v-if="user.lastName">
                            <v-list-item-subtitle>Nom</v-list-item-subtitle>
                            <v-list-item-title class="text-h6">
                                {{ user.lastName }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        two-line
                        color="rgba(0, 0, 0, .4)"
                    >
                        <v-list-item-content v-if="user.job">
                            <v-list-item-subtitle> Metier ou commerce</v-list-item-subtitle>
                            <v-list-item-title class="text-h6">
                                {{ user.job }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        two-line
                        color="rgba(0, 0, 0, .4)"
                    >
                        <v-list-item-content v-if="user.location">
                            <v-list-item-subtitle> Localisation</v-list-item-subtitle>
                            <v-list-item-title class="text-h6">
                                {{ user.location }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
                <v-col cols="2">
                    <v-spacer></v-spacer>
                    <!-- Ajout d'un espaceur pour pousser le bouton à droite -->
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
                                @click="goToProfil(user.id)"
                            >
                                <v-icon small>mdi-account-plus</v-icon>
                                <v-list-item-title>Consulter le profil</v-list-item-title>
                            </v-list-item>
                            <v-list-item
                                            class="pointer"
                                            @click="copyElement(item)"
                                        >
                                            <v-icon small>mdi-account</v-icon>
                                            <v-list-item-title><signal :userSignaled="user" /></v-list-item-title>
                                        </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    import signal from './Signal.vue';

    export default {
        props: {
            user: {
                type: Object,
                required: true,
            },
        },
        components: {
            signal,
        },
        methods: {
            goToProfil(id) {
                this.$router.push(`/profilWatch/${id}`);
            },
        },
    };
</script>

<style></style>
