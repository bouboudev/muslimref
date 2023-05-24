<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-form
                        @submit.prevent="validate"
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        autocomplete="off"
                    >
                        <v-card-title>
                            <h1 class="display-1">Se connecter</h1>
                        </v-card-title>

                        <v-text-field
                            v-model="email"
                            autocomplete="off"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            autocomplete="off"
                            type="password"
                            :rules="passwordRules"
                            label="Mot de passe"
                            required
                        ></v-text-field>
                        <div>Je n'ai pas de compte, je veux <router-link to="/signup">m'inscrire</router-link></div>
                        <v-btn
                            type="submit"
                            :disabled="!valid"
                            class="mr-4"
                        >
                            Se connecter
                        </v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { auth } from '../firebase';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    export default {
        data: () => ({
            valid: true,
            emailRules: [(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
            passwordRules: [
                (v) => !!v || 'Password is required',
                (v) => (v && v.length <= 10) || 'Password must be less than 10 characters',
            ],
            email: '',
            password: '',
        }),
        methods: {
            async validate() {
                try {
                    const user = await signInWithEmailAndPassword(auth, this.email, this.password);
                    this.reset();
                    console.log('login user', user);
                    this.$router.push({ name: 'home' });
                } catch (error) {
                    console.log(error);
                }
                this.$refs.form.validate();
            },
            reset() {
                this.$refs.form.reset();
            },
        },
    };
</script>
<style></style>
