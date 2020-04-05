import Vue from "vue"
import Vuex from 'vuex';
import home from "./home"
import auth from "./auth"
import blog from "./blog"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home,
        auth,
        blog
    }
})
