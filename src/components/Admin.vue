<template>
    <v-container fluid>
        <!-- card color with user length -->

        <v-row
            justify="center"
            align="center"
            style="height: 100vh"
        >
            <v-col
                cols="12"
                sm="8"
                md="10"
            >
                <div class="d-flex justify-center">
                    <WidgetCardTemplate
                        type="number"
                        :title="users.length"
                        subtitle="Nouveau utilisateurs"
                        text="à valider"
                        colorCard="primary"
                        size="160"
                    ></WidgetCardTemplate>
                    <WidgetCardTemplate
                        type="number"
                        :title="usersSignaled.length"
                        subtitle="Profils signalés"
                        text="à valider"
                        colorCard="warning"
                        size="160"
                    ></WidgetCardTemplate>
                </div>

                <v-card class="my-8">
                    <v-card-title>
                        Nouveaux utilisateurs
                        <v-icon
                            class="mx-2 mb-2"
                            large
                        >
                            mdi-account-multiple-plus
                        </v-icon>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="searchValidedProfile"
                            append-icon="mdi-magnify"
                            label="Rechercher"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                        :headers="headers"
                        :items="users"
                        :items-per-page="5"
                        class="elevation-1"
                        :search="searchValidedProfile"
                    >
                        <!-- v slot action -->
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-menu>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        icon
                                        v-on="on"
                                    >
                                        <v-icon
                                            color="grey_dark"
                                            class="pointer"
                                            >mdi-dots-vertical</v-icon
                                        >
                                    </v-btn>
                                </template>
                                <v-list dense>
                                    <v-list-item
                                        class="pointer"
                                        @click="validateProfil(item)"
                                    >
                                        <v-icon small>mdi-account</v-icon>
                                        <v-list-item-title>Valider l'utilisateur</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>
                    </v-data-table>
                </v-card>
                <v-card>
                    <v-card-title>
                        Profiles signalés
                        <v-icon
                            class="mx-2 mb-2"
                            large
                        >
                            mdi-account-alert
                        </v-icon>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="searchSignaledProfile"
                            append-icon="mdi-magnify"
                            label="Rechercher"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                        :headers="headersSignaled"
                        :items="usersSignaled"
                        :items-per-page="5"
                        class="elevation-1"
                        :search="searchSignaledProfile"
                    >
                        <!-- v slot actions -->
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-menu>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        icon
                                        v-on="on"
                                    >
                                        <v-icon
                                            color="grey_dark"
                                            class="pointer"
                                            >mdi-dots-vertical</v-icon
                                        >
                                    </v-btn>
                                </template>
                                <v-list dense>
                                    <v-list-item class="pointer">
                                        <template>
                                            <v-row justify="center">
                                                <v-dialog
                                                    v-model="dialog"
                                                    persistent
                                                    max-width="390"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-list-item
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        >
                                                        <v-list-item-title>
                                                            Supprimer l'utilisateur

                                                            <v-icon>mdi-account-cancel</v-icon>
                                                        </v-list-item-title>
                                                        </v-list-item>
                                                    </template>
                                                    <v-card>
                                                        <v-card-title class="text-h5">
                                                            êtes vous sur de vouloir supprimer le compte de :
                                                        </v-card-title>
                                                        <v-list>
                                                            <v-list-item>
                                                                <v-list-item-content>
                                                                    <v-list-item-title
                                                                        >{{ item.userSignaledFirstName }} -
                                                                        {{ item.userSignaledLastName }} -
                                                                        {{ item.userSignaledEmail }}</v-list-item-title
                                                                    >
                                                                </v-list-item-content>
                                                            </v-list-item>
                                                        </v-list>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                color="green darken-1"
                                                                text
                                                                @click="dialog = false"
                                                            >
                                                                annuler
                                                            </v-btn>
                                                            <v-btn
                                                                color="green darken-1"
                                                                text
                                                                @click="deleteProfil(item)"
                                                            >
                                                                Je confirme
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </v-row>
                                        </template>
                                    </v-list-item>
                                    <v-list-item class="pointer">
                                        <v-list-item-title>Classer sans suite</v-list-item-title>
                                        <v-icon>mdi-account-check</v-icon>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { db } from '../firebase';
    import { collection, onSnapshot, query } from 'firebase/firestore';
    import { mapState } from 'vuex';
    import WidgetCardTemplate from './templates/WidgetCardTemplate.vue';

    export default {
        components: {
            WidgetCardTemplate,
        },
        data() {
            return {
                headers: [
                    { text: 'nom', value: 'lastName' },
                    { text: 'prenom', value: 'firstName' },
                    { text: 'email', value: 'email' },
                    { text: 'metier', value: 'job' },
                    { text: 'numero', value: 'number' },
                    { text: 'actions', value: 'actions' },

                    // { text: 'entreprise', value: 'entreprise' },
                ],
                headersSignaled: [
                    { text: 'nom', value: 'userSignaledLastName' },
                    { text: 'prenom', value: 'userSignaledFirstName' },
                    { text: 'email', value: 'userSignaledEmail' },
                    { text: 'auteur du signalement', value: 'firstNameAuthor' },
                    { text: 'message', value: 'userSignaledMessage' },
                    { text: 'actions', value: 'actions' },

                    // { text: 'entreprise', value: 'entreprise' },
                ],
                items: [],
                users: [],
                searchValidedProfile: '',
                searchSignaledProfile: '',
                objet: {},
                usersSignaled: [],
                dialog: false,
            };
        },
        mounted() {
            this.getFirestoreCollection();
            this.getFirestoreCollectionSignaled();
        },
        methods: {
            async getFirestoreCollection() {
                // const querySnapshot = await getDocs(collection(db, 'informationsSheet'));
                // querySnapshot.forEach((doc) => {
                //     this.items.push(doc.data());
                // });
                const collectionRef = collection(db, 'informationsSheet');
                const q = query(collectionRef);

                onSnapshot(q, (snapshot) => {
                    const newData = [];
                    snapshot.forEach((doc) => {
                        //where profile is validated
                        if (doc.data().profilCompleted === false) newData.push(doc.data());
                    });
                    this.users = newData;
                    console.log('newData', newData);
                });
                // this.checkProfilIsCompleted();
            },
            async getFirestoreCollectionSignaled() {
                // const querySnapshot = await getDocs(collection(db, 'profilesSignaled'));
                // querySnapshot.forEach((doc) => {
                //     this.usersSignaled.push(doc.data());
                // });
                // console.log('usersSignaled', this.usersSignaled);

                const collectionRef = collection(db, 'profilesSignaled');
                const q = query(collectionRef);

                onSnapshot(q, (snapshot) => {
                    const newData = [];
                    snapshot.forEach((doc) => {
                        newData.push(doc.data());
                    });
                    this.usersSignaled = newData;
                    console.log('newData', newData);
                });
            },

            checkProfilIsCompleted() {
                this.items.forEach((item) => {
                    if (!item.profilCompleted) {
                        this.users.push(item);
                    }
                });
            },
            async validateProfil(item) {
                this.objet = item;
                this.objet.profilCompleted = true;
                await this.$store.dispatch('validateProfileSheet', this.objet);
                await this.getFirestoreCollection();
                console.log('validateProfil !', this.objet);
            },

            async deleteProfil(item) {
                await this.$store.dispatch('deleteProfilFirebase', item);
                this.dialog = false;
            },
        },
        computed: {
            ...mapState(['user']),
            //
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
