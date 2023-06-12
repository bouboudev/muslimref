<template>
    <div>
        <div v-if="loading">Chargement du profil...</div>
        <div v-else>
            <ProfilWatch
                :user-profile="userProfile"
                :sendRequest="sendRequestMatch"
                :isRequesting="isRequesting"
            ></ProfilWatch>
        </div>
    </div>
</template>

<script>
        import { db } from '@/firebase';
        import { collection, onSnapshot, query, where, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

        import ProfilWatch from '../components/ProfilWatch';
        export default {
            name: 'ProfilView',

            components: {
                ProfilWatch,
            },
            data() {
                return {
                    userProfile: {},
                    loading: true,
                    isRequesting: false,
                };
            },
           async mounted() {
                 this.getProfile();
                 
                const isRequestSent = await this.checkIfRequestAlreadySent();
                this.isRequesting = isRequestSent;
            },
            // async created() {
            //     const isRequestSent = await this.checkIfRequestAlreadySent();
            //     this.isRequesting = isRequestSent;
            // },

            methods: {
                async getProfile() {
                    const userId = this.$route.params.userId;
                    const collectionRef = collection(db, 'informationsSheet');
                    const q = query(collectionRef, where('id', '==', userId));

                    onSnapshot(q, (snapshot) => {
                        const newData = [];
                        snapshot.forEach((doc) => {
                            const data = doc.data();
                            newData.push(data);
                        });

                        // Vérifiez si des données ont été récupérées
                        if (newData.length > 0) {
                            Object.assign(this.userProfile, newData[0]);
                            // console.log('Profil trouvé', this.userProfile);
                            this.loading = false;
                        } else {
                            console.log('Profil introuvable');
                        }
                    });
                },
                // async sendRequestMatch() {
                //     console.log('sendRequestMatch');
                //     const currentUser = this.$store.state.user;
                //     if (currentUser){
                //         const currentUserId = currentUser.uid;
                //         const collectionRef = collection(db, 'informationsSheet');
                //         const q = query(collectionRef, where('id', '==', currentUserId));

                //         onSnapshot(q, (snapshot) => {
                //         const newData = [];
                //         snapshot.forEach((doc) => {
                //             const data = doc.data();
                //             newData.push(data);
                //             console.log('newData : ', newData);
                //         });
                //         });

                //     }
                // },

                // Fonction pour envoyer une demande d'accès à un utilisateur cible
                async sendRequestMatch(targetUserId) {
                    const currentUser = this.$store.state.user;
                    // Vérifier si l'utilisateur est déjà connecté
                    if (currentUser) {
                        // Récupérer l'ID de l'utilisateur connecté
                        const currentUserId = currentUser.uid;

                        // Envoyer la demande d'accès à l'utilisateur cible
                        const targetUserProfileRef = doc(db, 'informationsSheet', targetUserId);
                        console.log('targetUserProfileRef', targetUserProfileRef);

                        try {
                            await updateDoc(targetUserProfileRef, {
                                requests: arrayUnion({id : currentUserId, firstName : currentUser.firstName , lastName :currentUser.lastName, job : currentUser.job}),
                            });
                            console.log("Demande d'accès envoyée avec succès");

                            // await this.checkIfRequestAlreadySent();
                            //relancer la fonction pour vérifier si la demande a bien été envoyée
                           this.isRequesting = await this.checkIfRequestAlreadySent();
                        } catch (error) {
                            console.error("Erreur lors de l'envoi de la demande d'accès", error);
                        }
                    } else {
                        console.log('Utilisateur non connecté');
                    }
                },

                // Fonction pour vérifier si l'utilisateur connecté a déjà envoyé une demande d'accès à l'utilisateur cible
                async checkIfRequestAlreadySent() {
                    const targetUserId = this.$route.params.userId;
                    const currentUser = this.$store.state.user;
                    console.log('currentUser', currentUser);

                    // Vérifier si l'utilisateur est déjà connecté
                    if (currentUser) {
                        // Récupérer l'ID de l'utilisateur connecté
                        const currentUserId = currentUser.uid;

                        // Récupérer le profil de l'utilisateur cible
                        const targetUserProfileRef = doc(db, 'informationsSheet', targetUserId);
                        const targetUserProfileSnapshot = await getDoc(targetUserProfileRef);

                        const targetUserProfile = targetUserProfileSnapshot.data();

                        // Vérifier si l'utilisateur connecté a déjà envoyé une demande d'accès à l'utilisateur cible

                        if (targetUserProfile && targetUserProfile.requests && Array.isArray(targetUserProfile.requests)) {
                            if (targetUserProfile.requests.includes(currentUserId)) {
                                console.log('Demande déjà envoyée');
                                return true;
                            } else {
                                console.log('Demande non envoyée');
                                return false;
                            }
                            } else {
                            console.log('La propriété demandes n\'existe pas pour l\'utilisateur cible');
                            return false;
                            }
                                }else {
                        console.log('checkif : Utilisateur non connecté');
                    }
                },


            },
        };
</script>

<style></style>
