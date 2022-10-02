<template>
<div class="text-center ma-2">
    <v-snackbar v-model="snackbar">

        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            require: false
        },
        isShow: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        snackbar: {
            get: function () {
                return this.isShow
            },
        }
    }
}
</script>
