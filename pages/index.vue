<template>
<div>
    <ins-save-template-dialog :showTemplateSaveDialog="showTemplateSaveDialog" :javascript="javascript" :css="css" :html="html" @update="updateTemplateSaveDialog" />

    <InsSnackbars :isShow="showSnackbar" :text="snackbarText" />

    <div class="d-flex justify-end">
        <div class="mr-4">
            <ins-dropdown title="HISTORY" :items="histories" @changed="historyChange" />
        </div>

        <ins-button title="SAVE" @click="save" />
    </div>

    <v-row>
        <v-col md="8" offset-md="2">
            <ins-content :javascript="content.javascript" :css="content.css" :html="content.html" />
        </v-col>
    </v-row>

    <v-row justify="center" align="center">
        <v-col cols="12" justify="center">
            <ins-accordion @run="run">
                <v-row>
                    <v-col cols="12" :md="editorLabel === 'JS' ? 8 : editorLabel === '' ? 4 : 2">
                        <ins-editor label="JS" :value="javascript" @update="javascript = $event;" @focus="editorLabel = $event" />
                    </v-col>

                    <v-col cols="12" :md="editorLabel === 'HTML' ? 8 : editorLabel === '' ? 4 : 2">
                        <ins-editor label="HTML" :value="html" @update="html = $event;" @focus="editorLabel = $event" />
                    </v-col>

                    <v-col cols="12" :md="editorLabel === 'CSS' ? 8 : editorLabel === '' ? 4 : 2">
                        <ins-editor label="CSS" :value="css" @update="css = $event;" @focus="editorLabel = $event" />
                    </v-col>
                </v-row>
            </ins-accordion>
        </v-col>
    </v-row>

</div>
</template>

<script>
export default {
    name: "IndexPage",

    components: {
        // Bu sayfada pek ihtiyaç yok ancak bilerek lazy loading components yaptım
        InsAccordion: () => import("../components/ui/accordion/index"),
        InsButton: () => import("../components/ui/button/index"),
        InsDropdown: () => import("../components/ui/dropdown/index"),
        InsContent: () => import("../components/content/index"),
        InsEditor: () => import("../components/editor/index"),
        InsSaveTemplateDialog: () => import("../components/save-template-dialog"),
        InsSnackbars: () => import("../components/ui/snackbars"),
    },

    data: () => ({
        javascript: "",
        css: "",
        html: "",

        content: {
            javascript: '',
            css: '',
            html: '',
        },

        editorLabel: '',

        showTemplateSaveDialog: false,

        histories: [],
        showSnackbar: false,
        snackbarText: '',
    }),

    mounted() {
        this.loadLastTemplateHistory()

        this.loadHistoriesDropdown()
    },

    methods: {
        /**
         * Load last template history
         */
        loadLastTemplateHistory() {
            const lastTemplateHistory = JSON.parse(localStorage.getItem('lastTemplateHistory') || '{}')

            this.javascript = lastTemplateHistory.js
            this.css = lastTemplateHistory.css
            this.html = lastTemplateHistory.html
        },

        /**
         * Load histories drop-down menu
         */
        loadHistoriesDropdown() {
            const templates = JSON.parse(localStorage.getItem('templates') || '[]')
            if (templates && templates.length > 0) {
                this.histories = templates.map(template => {
                    return {
                        title: template.templateName,
                        value: template
                    }
                })
            }
        },

        /**
         * Open template save dialog
         */
        async save() {
            this.showTemplateSaveDialog = true
        },

        /**
         * Selected item value
         * @param {*} value changed template value
         */
        historyChange({
            value
        }) {
            if (typeof value !== 'undefined') {
                this.javascript = value.javascript
                this.css = value.css
                this.html = value.html
            }
        },

        /**
         * Save new template event
         * @param {*} event
         */
        updateTemplateSaveDialog(event) {
            this.showTemplateSaveDialog = event

            this.loadHistoriesDropdown()
        },

        /**
         * Run template
         */
        run() {
            this.content = {
                javascript: '',
                css: '',
                html: '',
            }

            setTimeout(async () => { // javascript kodu değişince tekrar çalışmıyordu o yüzden delay ekledim
                this.content = {
                    javascript: this.javascript,
                    css: this.css,
                    html: await this.replaceVariables(this.javascript, this.html),
                }
            }, 100)
        },

        /**
         * Replace dynamic variables
         * @param {*} javascript Javascript code
         * @param {*} html Html code
         */
        async replaceVariables(javascript, html) {
            this.appendUglifySscript()

            await this.delay(1000);

            const variables = this.getVariables(javascript)
            if (variables === null)
                return

            variables.map((item) => {
                html = html
                    .replace(/{{ /g, '{{')
                    .replace(/ }}/g, '}}')
                    .replace(`{{${item.name}}}`, item.value);
            });

            return html
        },

        delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        },

        appendUglifySscript() {
            const script = document.createElement("script");

            script.setAttribute('type', 'text/javascript')
            script.setAttribute('src', "https://yaakovyitzchak.github.io/coby/uglify.js")

            document.head.appendChild(script);
        },

        /**
         * Returns variables inside the javascript code
         * @param {*} javascript Javascript code
         */
        getVariables(javascript) {
            try {
                const findInPos = (start, end, str) => {
                    return str.substring(
                        start.pos,
                        end.endpos
                    );
                }

                let results = UglifyJS.parse(javascript).body.filter(x => x.__proto__.TYPE == "Var")
                    .map(x =>
                        x.definitions.map(y => ({
                            name: y.name.name,
                            value: y.value ? findInPos(y.value.start, y.value.end, javascript) : undefined
                        })),

                    ).flat()

                return results
            } catch (error) {
                this.snackbarText = 'Invalid javascript!'
                this.showSnackbar = true
            }

            return null
        }
    }
};
</script>
