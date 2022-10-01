<template>
<v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
        <v-btn small color="primary" dark v-bind="attrs" v-on="on">
            {{title}}
        </v-btn>
    </template>

    <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>

                <v-btn color="grey" plain @click="changed(item)">
                    {{item.title}}
                </v-btn>
            </v-list-item-title>
        </v-list-item>
    </v-list>
</v-menu>
</template>

<script>
export default {
    name: "Ins-Dropdown",

    props: {
        title: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: false
        }
    },

    methods: {
        changed(item) {
            this.$emit('changed', item)
        }
    }
};
</script>
