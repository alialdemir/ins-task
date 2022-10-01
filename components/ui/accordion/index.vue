<template>
<v-card>
    <v-card-title class="d-flex justify-end">
        <ins-button color="transparent" title="Minimize" class="mr-4" @click="toggleCard" />

        <ins-button color="indigo" title="Run" @click="run" v-shortkey="['ctrl','s']" @shortkey.native="run()" />
    </v-card-title>

    <v-expand-transition>
        <v-card-text v-show="expand" class="mx-auto">
            <slot></slot>
        </v-card-text>
    </v-expand-transition>
</v-card>
</template>

<script>
import InsButton from '../button/index'

export default {
    name: "Ins-Accordion",

    components: {
        InsButton,
    },

    data: () => ({
        panel: [0],
        expand: true,
    }),

    methods: {
        run() {
            this.$emit('run')
        },

        toggleCard() {
            this.expand = !this.expand
        }
    }
};
</script>
