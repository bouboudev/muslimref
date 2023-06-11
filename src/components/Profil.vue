<template>
    <v-container
        fluid
        v-show="isMounted"
    >
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
                <div v-if="!user">
                    <v-skeleton-loader
                        class="mx-auto"
                        max-width="600"
                        type="card-avatar"
                    ></v-skeleton-loader>
                </div>
                <div v-else>
                    <v-alert
                        v-show="user && !user.profilCompleted"
                        dense
                        type="info"
                    >
                        Votre profil n'est pas encore validé, il le sera dans les plus brefs délais.
                    </v-alert>
                    <!-- //TODO créer une description + une page profil pour acceder aux informations des autres utilisateurs -->
                    <v-card-actions class="justify-end">
                        <v-icon
                            icon
                            class="gray--text"
                            @click="toggleCard()"
                        >
                            mdi-pencil
                        </v-icon>
                    </v-card-actions>
                    <v-form
                        @submit.prevent="addInformationsSheet()"
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    > 
                        <v-card
                            class="pa-8"
                            :disabled="cardIsDisabled"
                        >
                            <v-card-text>
                                <div class="d-flex justify-end">
                                    <v-card-subtitle> Profil validé </v-card-subtitle>
                                    <v-icon
                                        class="success--text"
                                        v-if="user && user.profilCompleted"
                                    >
                                        mdi-check-circle
                                    </v-icon>
                                </div>

                                <v-flex class="mb-4"> Mon profil d'utilisateur </v-flex>
                                <!-- icon to disabled the card -->
                                <v-text-field
                                    v-model="user.firstName"
                                    label="Prénom"
                                ></v-text-field>
                                <v-text-field
                                    v-model="user.lastName"
                                    label="Nom"
                                ></v-text-field>
                                <v-autocomplete
                                    v-model="user.job"
                                    :items="jobs"
                                    item-text="name"
                                    label="Metier ou commerce"
                                    required
                                >
                                </v-autocomplete>
                                <v-text-field
                                    v-model="user.email"
                                    label="Adresse email"
                                ></v-text-field>
                                <v-text-field
                                    v-model="user.number"
                                    label="Numéro de téléphone"
                                ></v-text-field>
                                <!-- location -->
                                <v-text-field
                                    v-model="user.location"
                                    label="Ville"
                                ></v-text-field>
                                <v-text-field
                                    v-if="user.role === 'admin'"
                                    disabled
                                    v-model="user.role"
                                    label="role"
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions class="justify-center">
                                <v-btn
                                    color="primary"
                                    type="submit"
                                    :disabled="!formIsValid"
                                >
                                    <!-- icon save -->
                                    <v-icon left>mdi-content-save</v-icon>

                                    Enregistrer
                                </v-btn>
                                <!-- <v-btn
                                v-if="user && !user.profilCompleted"
                                color="success"
                                @click="validateMyProfil()"
                                :disabled="!formIsValid"
                            >
                                <v-icon left>mdi-content-save</v-icon>

                                Valider son profil
                            </v-btn> -->
                                <v-btn
                                    text
                                    @click="signOut"
                                >
                                    <span class="mr-2">Se déconnecter</span>
                                    <v-icon>mdi-logout</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import jobsJson from '@/assets/jobs.json';
    import { auth } from '../firebase';
    import 'firebase/auth';
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                valid: true,
                objet: {},
                cardIsDisabled: true,
                currentUser: null,
                isMounted: true,
                jobs: jobsJson,
            };
        },
        mounted() {
            console.log('this.$store.state.user', this.$store.state.user);
            //pause de 2 seconde

            // this.checkCurrentUser();
        },
        methods: {
            checkCurrentUser() {
                if (this.$store.state.user) {
                    // getInformationSheet
                    this.currentUser = this.$store.state.user;
                    this.objet = this.currentUser;
                    console.log('current user profil: ', this.currentUser);
                }
            },
            getInformationSheet() {
                console.log('getInformationSheet', this.$store.state.user);
                this.$store.dispatch('getInformationSheet', this.$store.state.user.id);
            },
            addInformationsSheet() {
                this.objet = this.$store.state.user;
                this.$store.dispatch('addInformationSheet', this.objet);
                this.toggleCard();
            },
            validateMyProfil() {
                this.objet = this.$store.state.user;
                this.objet.profilCompleted = true;
                this.$store.dispatch('addInformationSheet', this.objet);
                this.toggleCard();
            },
            toggleCard() {
                this.cardIsDisabled = !this.cardIsDisabled;
            },
            signOut() {
                auth.signOut().then(() => {
                    this.$router.replace({ name: 'login' });
                });
            },
        },
        computed: {
            ...mapState(['user']),
            // user() {
            //     return this.$store.state.user;
            // },
            formIsValid() {
                return this.user.firstName && this.user.lastName && this.user.job && this.user.email;
            },
        },
        beforeRouteLeave(to, from, next) {
            this.isMounted = false;
            next();
        },
    };
</script>

<style scoped></style>
