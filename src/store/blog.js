import axios from "axios"

export default {
    namespaced: true,
    state: {
        articles: [],
        article: {},
        categories: [],
    },

    getters: {
        getArticles(state) {
            return state.articles.data;
        },
        getArticlesMeta(state) {
            return state.articles;
        },
        getCategories(state) {
            return state.categories;
        },
        getArticle(state) {
            return state.article;
        }
    },

    mutations: {
        SET_ARTICLES(state, articles){
            state.articles = articles
        },
        SET_ARTICLE(state, article) {
            state.article = article;
        },
        SET_CATEGORIES(state, categories){
            state.categories = categories
        },
    },

    actions: {
        getArticles({commit}, form = "") {
            commit("SET_ARTICLE", ""); // Removing article (It shows as computed before the new title got from api)
            return new Promise((resolve) => {
                axios({
                    method: 'get',
                    url: process.env.VUE_APP_API_URL + "api/v1/articles" + `${form}`,
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                }).then(response => {
                    if(form != ""){
                        commit("SET_ARTICLE", response.data.data.article);
                    } else{
                        commit("SET_ARTICLES", response.data);
                    }
                    resolve(true)
                }).catch(error => {
                    alert(error.response.data.message);
                })
            })
        },
        getCategories({commit}) {
            return new Promise((resolve) => {
                axios({
                    method: 'get',
                    url: process.env.VUE_APP_API_URL + "api/v1/categories",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                }).then(response => {
                    commit("SET_CATEGORIES", response.data.data.categories);
                    resolve(true)
                }).catch(error => {
                    alert(error.response.data.message);
                })
            })
        },
        createArticle(_, data) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: process.env.VUE_APP_API_URL + "api/v1/articles",
                    data,
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                }).then( () => {
                    resolve(true);
                }).catch(error => {
                    reject(error.response.data.message)
                })
            })
        },
        comment(_, data) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: process.env.VUE_APP_API_URL + "api/v1/comment",
                    data,
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                }).then( () => {
                    resolve(true);
                }).catch(error => {
                    reject(error.response.data.message)
                })
            })
        }
    }
}
