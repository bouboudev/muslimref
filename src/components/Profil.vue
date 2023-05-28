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
                
                <v-card-actions class="justify-end">

                    <v-icon
                    icon
                    class="gray--text"
                    @click="toggleCard()"
                    >
                        mdi-pencil
                    </v-icon>
                </v-card-actions>
                    

                    <v-card
                        class="pa-8"
                        :disabled="cardIsDisabled"
                    >
                        <v-card-text>
                            <v-flex class="mb-4"> Mon profile d'utilisateur </v-flex>
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
                                v-model="user.email"
                                label="Adresse email"
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn
                                color="primary"
                                @click="addInformationsSheet()"
                            >
                                <!-- icon save -->
                                <v-icon left>mdi-content-save</v-icon>

                                Enregistrer
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                objet: {
                    firstName: '',
                    lastName: '',
                },
                cardIsDisabled: true,
            };
        },
        mounted() {
            this.initProfile();
            this.checkCurrentUser();
            //console user
        },
        methods: {
            checkCurrentUser() {
                if (this.$store.state.user) {
                    this.currentUser = this.$store.state.user;
                    console.log(this.currentUser);
                }
            },
            updateProfileComponent() {
                this.$store.dispatch('updateProfileStore', this.currentUser.displayName);
            },
            addInformationsSheet() {
                this.$store.dispatch('addInformationSheet', this.objet);
            },
            initProfile() {
                this.objet.firstName = this.user.userFirstName;
                this.objet.lastName = this.user.userLastName;
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
        },
    };
</script>

<style scoped>
</style>

