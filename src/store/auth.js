import axios from "axios"

export default {
    namespaced: true,
    state: {
        token: ""
    },
    getters: {
        getUser(){
            return JSON.parse(localStorage.getItem("user"));
        }
    },

    actions: {
        signIn(_, form){
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: process.env.VUE_APP_API_URL + "api/v1/auth/login",
                    data: form,
                    headers: {'Content-Type': 'multipart/form-data' }
                }).then( resp => {
                    localStorage.setItem('token', resp.data.data.tokens.access_token)
                    localStorage.setItem('user', JSON.stringify(resp.data.data.user))
                    resolve(resp);
                }).catch(error => {
                    reject(error.response.data.message)
                })
            })

        },
        async signUp(_, form){
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: process.env.VUE_APP_API_URL + "api/v1/auth/register",
                    data: form,
                    headers: {'Content-Type': 'multipart/form-data' }
                }).then( resp => {
                    localStorage.setItem('token', resp.data.data.tokens.access_token)
                    localStorage.setItem('user', JSON.stringify(resp.data.data.user))
                    resolve(resp);
                }).catch(error => {
                    reject(error.response.data.message)
                })
            })

        },

    }
}
