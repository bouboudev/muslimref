<template>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="elevation-1"
    ></v-data-table>
</template>

<script>
    import { db } from '../firebase';
    import { collection, getDocs } from 'firebase/firestore';
    export default {
        data() {
            return {
                headers: [
                    {
                        text: 'id',
                        align: 'start',
                        sortable: false,
                        value: 'id',
                    },
                    { text: 'nom', value: 'nom' },
                    { text: 'prenom', value: 'prenom' },
                ],
                items: [],
            };
        },
        mounted() {
            this.getFirestoreCollection();
        },
        methods: {
            async getFirestoreCollection() {
                const querySnapshot = await getDocs(collection(db, 'test'));
                querySnapshot.forEach((doc) => {
                    this.items.push(doc.data());
                });
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
