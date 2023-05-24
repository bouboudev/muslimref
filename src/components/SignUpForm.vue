<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
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
                        ></v-text-field>

                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                        <!-- mot de passe -->
                        <v-text-field
                            v-model="password"
                            type="password"
                            :rules="passwordRules"
                            label="Mot de passe"
                            required
                        ></v-text-field>

                        <v-text-field
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
                        ></v-text-field>

                        <v-btn
                            :disabled="!valid"
                            class="mr-4"
                            @click="validate"
                        >
                            Validate
                        </v-btn>

                        <v-btn
                            class="mr-4"
                            @click="reset"
                        >
                            Reset Form
                        </v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            valid: true,
            nameRules: [(v) => !!v || 'Name is required', (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'],
            jobRules: [(v) => !!v || 'Job is required', (v) => (v && v.length <= 10) || 'Job must be less than 10 characters'],
            emailRules: [(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
            numberRules: [(v) => !!v || 'Number is required', (v) => (v && v.length <= 10) || 'Number must be less than 10 characters'],
            passwordRules: [
                (v) => !!v || 'Password is required',
                (v) => (v && v.length <= 10) || 'Password must be less than 10 characters',
            ],
            email: '',
            checkbox: false,
            firstName: '',
            lastName: '',
            job: '',
            number: '',
            password: '',
        }),

        methods: {
            validate() {
                this.$refs.form.validate();
            },
            reset() {
                this.$refs.form.reset();
            },
        },
    };
</script>
<style></style>
