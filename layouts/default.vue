<template>
<v-app dark>
    <v-main>
        <v-container>
            <Nuxt />
        </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
    </v-footer>
</v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    data() {
        return {
            fixed: false,
            title: 'Insider Task'
        }
    }
}
</script>
