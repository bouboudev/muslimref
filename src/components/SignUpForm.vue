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
                        <!-- <v-text-field
                            v-model="lastName"
                            :counter="10"
                            :rules="nameRules"
                            label="Nom"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="firstName"
                            :counter="10"
                            :rules="nameRules"
                            label="Prénom"
                            required
                        ></v-text-field> -->

                        <v-text-field
                            v-model="register_form.email"
                            :rules="emailRules"
                            autocomplete="off"
                            label="E-mail"
                            required
                        ></v-text-field>
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
                        <div class="py-4">J'ai déjà un compte, je veux <router-link to="/login">me connecter.</router-link></div>

                        <!-- <v-text-field
                            v-model="job"
                            :rules="jobRules"
                            label="Metier ou commerce"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="number"
                            :rules="numberRules"
                            label="Numéro de téléphone"
                            required
                        ></v-text-field> -->

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
    export default {
        data: () => ({
            valid: true,
            show1: false,
            nameRules: [(v) => !!v || 'Name is required', (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'],
            jobRules: [(v) => !!v || 'Job is required', (v) => (v && v.length <= 10) || 'Job must be less than 10 characters'],
            emailRules: [(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'Votre email doit être valide'],
            numberRules: [(v) => !!v || 'Number is required', (v) => (v && v.length <= 10) || 'Number must be less than 10 characters'],
            passwordRules: [
                (v) => !!v || 'Votre mot de passe est requis',
                (v) => (v && v.length <= 10) || 'Votre mot de passe doit contenir moins de 10 caractères',
            ],
            firstName: '',
            lastName: '',
            job: '',
            number: '',
            register_form: {
                email: '',
                password: '',
            },
            confirmPassword: '',
        }),

        methods: {
            async validate() {
                if (this.valid)
                    this.$store.dispatch('register', this.register_form).catch((error) => {
                        console.log(error);
                    });
            },
            reset() {
                this.$refs.form.reset();
            },
        },
        computed: {
            passwordMatch() {
                return this.register_form.password === this.confirmPassword;
            },
            formIsValid() {
                return this.register_form.email && this.register_form.password && this.passwordMatch;
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
