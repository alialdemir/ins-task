<template>
<v-btn small :color="color" @click="click">
    {{title}}
</v-btn>
</template>

<script>
export default {
    name: "Ins-Button",

    props: {
        title: String,

        color: {
            type: String,
            default: 'success'
        },
    },

    methods: {
        click() {
            this.$emit('click')
        }
    }
};
</script>
