<template>
<v-textarea ref="textarea" auto-grow clearable clear-icon="mdi-close-circle" outlined :label="label" v-model="mutableValue" @focus="$emit('focus',label)" @focusout="$emit('focus','')"></v-textarea>
</template>

<script>
export default {
    name: "Ins-Editor",

    props: {
        label: {
            type: String,
            required: false
        },

        value: {
            type: String,
            required: false
        },
    },

    watch: {
        mutableValue: function () {
            this.setLastTemplateHistory()
        }
    },

    mounted() {
        this.setLastTemplateHistory()
    },

    methods: {
        /**
         * We hold on to the past so that it can continue from where it left off.
         */
        setLastTemplateHistory() {
            const lastTemplateHistory = JSON.parse(localStorage.getItem('lastTemplateHistory') || '{}')
            lastTemplateHistory[this.label.toLowerCase()] = this.mutableValue

            localStorage.setItem('lastTemplateHistory', JSON.stringify(lastTemplateHistory))
        }
    },

    computed: {
        mutableValue: {
            get: function () {
                return this.value
            },
            set: function (value) {
                this.$emit('update', value)
            }
        }
    },
};
</script>
