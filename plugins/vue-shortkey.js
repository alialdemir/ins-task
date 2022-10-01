import Vue from 'vue'
const ShortKey = require('vue-shortkey')

// add any custom shortkey config settings here
Vue.use(ShortKey, { prevent: ['button'] })

export default ShortKey