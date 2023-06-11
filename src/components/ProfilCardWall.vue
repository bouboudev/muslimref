<template>
    <div>
        <v-card class="pa-5" @click="goToProfil(user.id)">
            <v-avatar size="100">
                <v-img src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png" />
            </v-avatar>

            <v-list-item
                two-line
                color="rgba(0, 0, 0, .4)"
                
            >
                <v-list-item-content v-if="user.firstName">
                    <v-list-item-subtitle>Prénom</v-list-item-subtitle>
                    <v-list-item-title class="text-h6">
                        {{ user.firstName }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                two-line
                color="rgba(0, 0, 0, .4)"
                
            >
                <v-list-item-content v-if="user.lastName">
                    <v-list-item-subtitle>Nom</v-list-item-subtitle>
                    <v-list-item-title class="text-h6">
                        {{ user.lastName }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                two-line
                color="rgba(0, 0, 0, .4)"
                
            >
                <v-list-item-content v-if="user.job">
                    <v-list-item-subtitle> Metier ou commerce</v-list-item-subtitle>
                    <v-list-item-title class="text-h6">
                        {{ user.job }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                two-line
                color="rgba(0, 0, 0, .4)"
                
            >
                <v-list-item-content v-if="user.location">
                    <v-list-item-subtitle> Localisation</v-list-item-subtitle>
                    <v-list-item-title class="text-h6">
                        {{ user.location }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-card>
    </div>
</template>

<script>
    export default {
        props: {
            user: {
                type: Object,
                required: true,
            },
        },
        methods: {
            goToProfil(id) {
                this.$router.push(`/profilWatch/${id}`);
            },
        },
    };
</script>

<style></style>
