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
                            v-model="currentUser.displayName"
                            label="displayname"
                        ></v-text-field>
                         <v-text-field
                            v-model="objet.firstName"
                            label="firstname"
                        ></v-text-field>
                         <v-text-field
                            v-model="objet.lastName"
                            label="lastname"
                        ></v-text-field>
                        <v-text-field
                            v-model="form.lastName"
                            label="Last Name"
                        ></v-text-field>
                        <v-text-field
                            v-model="currentUser.email"
                            label="Adresse email"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            :loading="loading"
                            @click="addInformationsSheet()"
                        >
                            <!-- icon save -->
                            <v-icon left>mdi-content-save</v-icon>

                            Enregistrer les changements
                        </v-btn>
                        <v-btn
                            color="primary"
                            :loading="loading"
                            @click="getInformationSheet()"
                        >
                            <!-- icon save -->
                            <v-icon left>mdi-content-save</v-icon>

                            getInformationSheet
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                currentUser: {
                    displayName: '',
                },
                objet:{
                    firstName: '',
                    lastName: '',
                },
                form: {
                    firstName: 'John',
                    lastName: 'Doe',
                    contactEmail: 'john@doe.com',
                    avatar: 'MALE_CAUCASIAN_BLOND_BEARD',
                },
                showAvatarPicker: false,
                loading: false,
            };
        },
        mounted() {
            this.checkCurrentUser();
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
            getInformationSheet() {
                this.$store.dispatch('getInformationSheet', this.currentUser.uid);
            },
        },
    };
</script>

<style></style>
