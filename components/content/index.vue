<template>
<v-row justify="center" align="center">
    <v-col cols="6" class="ins-content">
        <component v-if="javascript" :is="'script'">
            {{javascript}}
        </component>

        <component v-if="css" is="style">
            {{css}}
        </component>

        <div v-html="html"></div>
    </v-col>
</v-row>
</template>

<script>
export default {
    name: "InsContent",

    props: {
        javascript: {
            type: String,
            required: false
        },
        css: {
            type: String,
            required: false
        },
        html: {
            type: String,
            required: false
        },
    },
};
</script>
