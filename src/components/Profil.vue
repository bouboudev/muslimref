<template>
    <!-- <v-container fluid>
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
                <v-card class="pa-8"> 
              {{currentUser}}
                    
                </v-card>
            </v-col>
        </v-row>
    </v-container> -->

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
                <v-card>
                    <v-card-text>
                        <v-flex class="mb-4"> </v-flex>
                        <v-text-field
                            v-model="objet.firstName"
                            label="firstname"
                        ></v-text-field>
                        <v-text-field
                            v-model="objet.lastName"
                            label="lastname"
                        ></v-text-field>
                        <v-text-field
                            v-model="user.email"
                            label="Adresse email"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            @click="addInformationsSheet()"
                        >
                            <!-- icon save -->
                            <v-icon left>mdi-content-save</v-icon>

                            Enregistrer les changements
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
        },
        computed: {
            ...mapState(['user']),
            user() {
                return this.$store.state.user;
            },
        },
    };
</script>

<style></style>
