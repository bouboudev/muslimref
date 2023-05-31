<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-card-text
                    v-bind="attrs"
                    v-on="on"
                >
                    Signaler
                </v-card-text>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Signalement du profil</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    :value="userSignaled.firstName"
                                    label="Prenom"
                                    required
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    :value="userSignaled.lastName"
                                    label="Nom"
                                    required
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    :value="userSignaled.email"
                                    label="email"
                                    required
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <!-- text -->
                                <v-textarea
                                    v-model="signal.message"
                                    label="Le signalement"
                                    hint="Expliquez pourquoi vous signalez ce profil"
                                ></v-textarea>
                            </v-col>

                            <v-col
                                cols="12"
                                sm="6"
                            >
                                {{ userSignaled }}
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                        Annuler
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="sendSignal()"
                    >
                        Envoyer
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        props: {
            userSignaled: {
                type: Object,
                required: true,
            },
        },
        data: () => ({
            dialog: false,
            signal: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                message: '',
                signalAuthorId: '',
                firstNameAuthor: '',
            },
        }),
        methods: {
            async sendSignal() {
                this.signal.id = this.userSignaled.id;
                this.signal.firstName = this.userSignaled.firstName;
                this.signal.lastName = this.userSignaled.lastName;
                this.signal.email = this.userSignaled.email;
                this.signal.signalAuthorId = this.user.id;
                this.signal.firstNameAuthor = this.user.firstName;

                this.dialog = false;

                console.log('sendSignal', this.signal);
                await this.$store.dispatch('signalProfile', this.signal);
            },
        },
        computed: {
            ...mapState({
                user: (state) => state.user,
            }),
        },
    };
</script>

<style></style>
