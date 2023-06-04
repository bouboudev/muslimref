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
                <Logo />
                <v-card class="pa-8">
                    <v-form
                        @submit.prevent="validate"
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <!-- title -->
                        <v-card-title>
                            <h1 class="display-1">S'inscrire</h1>
                        </v-card-title>
                        <v-text-field
                            v-model="register_form.lastName"
                            :counter="10"
                            :rules="nameRules"
                            label="Nom"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="register_form.firstName"
                            :counter="10"
                            :rules="nameRules"
                            label="Prénom"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="register_form.email"
                            :rules="emailRules"
                            autocomplete="off"
                            label="E-mail"
                            required
                        ></v-text-field>
                        <!-- jobs list -->
                        <v-autocomplete
                            v-model="register_form.job"
                            :items="jobs"
                            item-text="name"
                            label="Metier ou commerce"
                            required
                        >
                        </v-autocomplete>

                        <v-text-field
                            v-model="register_form.number"
                            :rules="numberRules"
                            label="Numéro de téléphone"
                            required
                        ></v-text-field>
                        <v-autocomplete
                            v-model="selectedLocation"
                            :items="locations"
                            :loading="loading"
                            :search-input.sync="register_form.location"
                            label="Localisation"
                            item-text="name"
                            item-value="geonameId"
                            required
                        ></v-autocomplete>

                        <!-- mot de passe -->
                        <v-text-field
                            v-model="register_form.password"
                            :rules="passwordRules"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            label="Mot de passe"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="confirmPassword"
                            :rules="confirmPasswordRules"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            label="Confirmer le mot de passe"
                            required
                        ></v-text-field>
                        <v-dialog
                            v-model="dialog"
                            max-width="500px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-checkbox
                                    v-model="acceptTerms"
                                    label="Accepter les conditions d'utilisation et la charte de confidentialité"
                                    required
                                    class="h6"
                                    v-on="on"
                                    @click="dialog = true"
                                ></v-checkbox>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Charte de Confidentialité et Conditions d'Utilisation</span>
                                </v-card-title>
                                <v-card-text>
                                    <p>Collecte de données personnelles :</p>
                                    <p>
                                        1.1. MuslimRef collecte les informations personnelles fournies par les utilisateurs lors de leur
                                        inscription, telles que leur nom, adresse e-mail, numéro de téléphone, etc.
                                    </p>
                                    <p>
                                        1.2. Les informations collectées seront utilisées dans le but de faciliter l'entraide et les
                                        références entre les membres de la communauté MuslimRef.
                                    </p>

                                    <p>Utilisation des données personnelles :</p>
                                    <p>
                                        2.1. Les données personnelles fournies par les utilisateurs seront traitées de manière
                                        confidentielle et ne seront pas divulguées à des tiers sans le consentement préalable de
                                        l'utilisateur, sauf dans les cas prévus par la loi.
                                    </p>
                                    <p>
                                        2.2. MuslimRef utilisera les informations personnelles pour faciliter les connexions entre les
                                        utilisateurs, fournir des recommandations personnalisées, et envoyer des informations pertinentes
                                        concernant les activités du site.
                                    </p>
                                    <p>
                                        2.3. Les utilisateurs peuvent choisir de recevoir ou de ne pas recevoir des communications
                                        promotionnelles de la part de MuslimRef.
                                    </p>

                                    <p>Sécurité des données :</p>
                                    <p>
                                        3.1. MuslimRef mettra en œuvre les mesures de sécurité appropriées pour protéger les données
                                        personnelles des utilisateurs contre tout accès non autorisé, toute divulgation ou toute
                                        destruction.
                                    </p>
                                    <p>
                                        3.2. Les utilisateurs sont responsables de la confidentialité de leurs informations de connexion et
                                        doivent prendre les mesures nécessaires pour les protéger contre tout accès non autorisé.
                                    </p>

                                    <p>Suppression de données :</p>
                                    <p>
                                        4.1. Les utilisateurs ont le droit de demander la suppression de leurs données personnelles de la
                                        base de données de MuslimRef à tout moment.
                                    </p>
                                    <p>
                                        4.2. MuslimRef s'engage à supprimer les données personnelles des utilisateurs dans un délai
                                        raisonnable après réception de la demande de suppression, sauf si la conservation de ces données est
                                        requise par la loi.
                                    </p>

                                    <p>Responsabilité de l'utilisateur :</p>
                                    <p>
                                        5.1. Les utilisateurs sont responsables de l'exactitude des informations personnelles qu'ils
                                        fournissent à MuslimRef.
                                    </p>
                                    <p>
                                        5.2. Les utilisateurs s'engagent à respecter les conditions d'utilisation de MuslimRef et à ne pas
                                        utiliser le site à des fins illégales ou préjudiciables.
                                    </p>

                                    <p>Modifications de la charte :</p>
                                    <p>
                                        6.1. MuslimRef se réserve le droit de modifier cette charte de confidentialité et les conditions
                                        d'utilisation à tout moment. Les utilisateurs seront informés de ces modifications et seront invités
                                        à les accepter avant de continuer à utiliser le site.
                                    </p>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        text
                                        @click="dialog = false"
                                        >Fermer</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <div class="py-4">J'ai déjà un compte, je veux <router-link to="/login">me connecter.</router-link></div>
                        <v-btn
                            type="submit"
                            :disabled="!formIsValid"
                            class="mr-4"
                        >
                            S'inscrire
                        </v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    // import { auth } from '../firebase';
    // import { createUserWithEmailAndPassword } from 'firebase/auth';
    import axios from 'axios';
    import Logo from './templates/LogoTemplate.vue';
    import jobsJson from '@/assets/jobs.json';
    export default {
        data: () => ({
            valid: true,
            show1: false,
            nameRules: [(v) => !!v || 'Name is required', (v) => (v && v.length <= 15) || 'Name must be less than 15 characters'],
            jobRules: [(v) => !!v || 'Job is required', (v) => (v && v.length <= 15) || 'Job must be less than 15 characters'],
            emailRules: [(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'Votre email doit être valide'],
            numberRules: [(v) => !!v || 'Number is required', (v) => (v && v.length <= 10) || 'Number must be less than 10 characters'],
            passwordRules: [
                (v) => !!v || 'Votre mot de passe est requis',
                (v) => (v && v.length <= 10) || 'Votre mot de passe doit contenir moins de 10 caractères',
            ],
            firstName: '',
            lastName: '',
            otherJob: '',
            number: '',
            register_form: {
                firstName: '',
                lastName: '',
                job: '',
                number: '',
                email: '',
                password: '',
                location: '',
            },
            jobs: jobsJson,
            confirmPassword: '',
            acceptTerms: false,
            dialog: false,
            selectedLocation: null,
            locations: [],
            loading: false,
        }),
        components: {
            Logo,
        },

        methods: {
            async validate() {
                if (this.valid) {
                    this.register_form.acceptTerms = true;
                    await this.$store.dispatch('register', this.register_form).catch((error) => {
                        console.log(error);
                    });
                    console.log('register_form', this.register_form);
                }
            },
            reset() {
                this.$refs.form.reset();
            },
            fetchLocations() {
                this.loading = true;
                axios
                    .get(`http://api.geonames.org/searchJSON?q=${this.register_form.location}&maxRows=5&username=muslimref`)
                    .then((response) => {
                        console.log(response);
                        this.locations = response.data.geonames;
                        this.loading = false;
                    })
                    .catch((error) => {
                        console.error(error);
                        this.loading = false;
                    });
            },
            handleLocationChange() {
                console.log('Location selected:', this.selectedLocation);
            },
        },
        watch: {
            'register_form.location': function (newSearch) {
                this.fetchLocations(newSearch);
            },
        },
        computed: {
            passwordMatch() {
                return this.register_form.password === this.confirmPassword;
            },
            formIsValid() {
                return this.register_form.email && this.register_form.password && this.passwordMatch && this.acceptTerms;
            },
            confirmPasswordRules() {
                return [
                    (v) => !!v || 'Password confirmation is required',
                    (v) => v === this.register_form.password || 'Password does not match',
                    (v) => (v && v.length <= 10) || 'Password must be less than 10 characters',
                ];
            },
        },
    };
</script>
<style></style>
