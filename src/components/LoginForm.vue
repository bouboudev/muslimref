<template>
    <v-container fluid>
        <v-row
            justify="center"
            align="center"
            style="height: 100vh"
        >
            <!-- snackbar message-->
            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                top
                color="error"
            >
            {{ messageSnackbar }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="white"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                    >
                        Fermer
                    </v-btn>
                </template>
            </v-snackbar>

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
                        <v-card-title>
                            <h1 class="display-1">Se connecter</h1>
                        </v-card-title>

                        <v-text-field
                            v-model="login_form.email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="login_form.password"
                            type="password"
                            :rules="passwordRules"
                            label="Mot de passe"
                            required
                        ></v-text-field>
                        <div class="py-4">Je n'ai pas de compte, je veux <router-link to="/signup">m'inscrire.</router-link></div>
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
    import Logo from './templates/LogoTemplate.vue';
    // import { auth } from '../firebase';
    // import { signInWithEmailAndPassword } from 'firebase/auth';
    export default {
        data: () => ({
            valid: true,
            emailRules: [(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
            passwordRules: [
                (v) => !!v || 'Password is required',
                (v) => (v && v.length <= 10) || 'Password must be less than 10 characters',
            ],
            login_form: {
                email: '',
                password: '',
            },
            snackbar: false,
            timeout: 2000,
        }),
        components: {
            Logo,
        },

        methods: {
            // async validate() {
            //     try {
            //         await signInWithEmailAndPassword(auth, this.email, this.password);
            //         const currentUser = auth.currentUser;
            //         this.setUser(currentUser);
            //         console.log('after login currentUser :', currentUser);
            //         this.reset();

            //         this.$router.push({ name: 'home' });
            //     } catch (error) {
            //         console.log(error);
            //     }
            //     this.$refs.form.validate();
            // },

            validate() {
                this.$store.dispatch('login', this.login_form).catch((error) => {
                    console.log(error);
                    // this.snackbar = true;
                });
            },
            reset() {
                this.$refs.form.reset();
            },
        },
        computed: {
            messageSnackbar() {
                return this.$store.state.messageSnackbar;
            },
        },
    watch: {
  messageSnackbar(newData) {
    if (newData) {
      this.snackbar = true;
    }
  },
},
    };
</script>
<style></style>
