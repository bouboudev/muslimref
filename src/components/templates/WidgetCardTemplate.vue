<template>
    <router-link :to="{ name: to }">
        <v-card
            height="120"
            :width="size"
            flat
            :color="colorCard"
            align="center"
            class="mx-2 my-2"
        >
            <v-card-title class="text-h3 white--text justify-center font-weight-bold">{{ title }}{{ afterTitle(type) }}</v-card-title>
            <v-card-subtitle class="white--text text-subtitle-1 text-center font-weight-bold pb-0">{{ subtitle }}</v-card-subtitle>
            <v-card-text
                
                class="text-subtitle-2 text-center"
            >
            {{text}}
            </v-card-text>
        </v-card>
    </router-link>
</template>

<script>
    export default {
        props: {
            to: {
                type: String,
            },
            type: {
                type: String,
                required: true,
            },
            title: {
                type: Number,
                required: true,
            },
            subtitle: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: false,
            },

            colorCard: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                exemplData: 'Hello world',
            };
        },
        methods: {
            afterTitle(type) {
                switch (type) {
                    case 'number':
                        return '';
                    case 'pourcentage':
                        return '%';
                    case 'abscence':
                        return ' jours';
                    default:
                        break;
                }
            },
        },
    };
</script>

<style scoped>

a {
    text-decoration: none;
}

</style>
