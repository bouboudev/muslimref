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
                <v-alert
                    v-if="!objet.profilCompleted"
                    dense
                    type="info"
                >
                    Vous devez valider votre profil pour figurer dans la liste des utilisateurs.
                </v-alert>

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
                            <v-icon
                                class="success--text d-flex justify-end"
                                v-if="objet.profilCompleted"
                            >
                                mdi-check-circle
                            </v-icon>
                            <v-flex class="mb-4"> Mon profil d'utilisateur </v-flex>
                            <!-- icon to disabled the card -->
                            <v-text-field
                                v-model="objet.firstName"
                                label="Prénom"
                            ></v-text-field>
                            <v-text-field
                                v-model="objet.lastName"
                                label="Nom"
                            ></v-text-field>
                            <v-text-field
                                v-model="objet.job"
                                label="Métier"
                            ></v-text-field>
                            <v-text-field
                                v-model="user.email"
                                label="Adresse email"
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
                            <v-btn
                                v-if="!objet.profilCompleted"
                                color="success"
                                @click="validateMyProfil()"
                                :disabled="!formIsValid"
                            >
                                <!-- icon save -->
                                <v-icon left>mdi-content-save</v-icon>

                                Valider son profil
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                valid: true,
                objet: {},
                cardIsDisabled: true,
                currentUser: null,
            };
        },
        beforeMount() {
            // this.initProfile();
        },
        mounted() {
            console.log('this.$store.state.user', this.$store.state.user);
            this.checkCurrentUser();
            
        },
        methods: {
            checkCurrentUser() {
                if (this.$store.state.user) {
                    this.currentUser = this.$store.state.user;
                    this.objet = this.currentUser;
                    console.log('current user profil: ', this.currentUser);
                }
            },
            addInformationsSheet() {
                this.objet.email = this.currentUser.email;
                this.objet.profilCompleted = true;
                this.$store.dispatch('addInformationSheet', this.objet);
            },
            validateMyProfil() {
                this.objet.profilCompleted = true;
                this.$store.dispatch('addInformationSheet', this.objet);
            },
            initProfile() {
                this.objet.firstName = this.user.userFirstName;
                this.objet.lastName = this.user.userLastName;
                this.objet.profilCompleted = this.user.profilCompleted;
                this.objet.email = this.user.email;
                this.objet.job = this.user.userJob;
                //getInformationSheet
            },
            toggleCard() {
                this.cardIsDisabled = !this.cardIsDisabled;
            },
        },
        computed: {
            ...mapState(['user']),
            user() {
                return this.$store.state.user;
            },
            formIsValid() {
                return this.objet.firstName && this.objet.lastName && this.objet.job && this.objet.email;
            },
        },
    };
</script>

<style scoped></style>
