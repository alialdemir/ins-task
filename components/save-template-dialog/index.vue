<template>
<v-row justify="center" v-if="mutableShowTemplateSaveDialog">
    <v-dialog v-model="mutableShowTemplateSaveDialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Save Template</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field ref="txtTemplateName" :rules="[rules.required]" label="Template Name(*)" v-model="templateName" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="toggleModal">
                    Close
                </v-btn>

                <v-btn color="blue darken-1" text @click="save">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-row>
</template>

<script>
export default {
    name: 'InsSaveTemplateDialog',

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
        showTemplateSaveDialog: {
            type: Boolean,
            required: false,
            default: false
        },
    },

    data: () => ({
        templateName: '',
        mutableShowTemplateSaveDialog: false,

        rules: {
            required: value => !!value || 'Template name is required.',
        },
    }),

    watch: {
        showTemplateSaveDialog: function () {
            this.mutableShowTemplateSaveDialog = this.showTemplateSaveDialog
        }
    },

    mounted() {
        if (this.$refs.txtTemplateName) {
            this.$refs.txtTemplateName.focus()
        }
    },

    methods: {
        /**
         * 
         */
        toggleModal() {
            this.mutableShowTemplateSaveDialog = !this.mutableShowTemplateSaveDialog

            this.$emit('update', this.mutableShowTemplateSaveDialog)
        },

        /**
         * Save template
         */
        save() {
            if (!this.templateName) {
                this.$refs.txtTemplateName.focus()

                return
            }

            const templates = JSON.parse(localStorage.getItem('templates') || '[]')

            const page = {
                javascript: (this.javascript || '').replace(/\n/g, ''),
                css: (this.css || '').replace(/\n/g, ''),
                html: (this.html || '').replace(/\n/g, ''),
                templateName: this.templateName
            }

            templates.push(page)

            localStorage.setItem('templates', JSON.stringify(templates))

            this.templateName = ''

            this.toggleModal()
        },
    }
}
</script>
