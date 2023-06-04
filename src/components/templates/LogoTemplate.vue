<template>
    <div>
        <!-- v image center logo -->
        <v-img
        v-if="light"
            src="@/assets/image.png"
            alt="Vuetify Logo"
            class="mx-auto"
            :max-width="width"
        ></v-img>
        <v-img
        v-else
            src="@/assets/image2.png"
            alt="Vuetify Logo"
            class="mx-auto"
            :max-width="width"
        ></v-img>
    </div>
</template>

<script>
    export default {
        name: 'LogoTemplate',

        props: {
            light: Boolean,
            width : {
                type: Number,
                default: 200,
            },
        },


    };
</script>

<style></style>
