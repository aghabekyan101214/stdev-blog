<template>
    <div>
        <div class="container pt-5">
            <div class="row">
                <div class="col-md-6 pb-3">
                    <b-input-group class="mt-3">
                        <b-form-input v-model="filter"></b-form-input>
                        <b-input-group-append>
                            <b-button @click="search" variant="info">Search</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </div>
                <div class="col-md-6">
                    <select v-model="sort" class="form-control mt-3">
                        <option value="">Choose Order</option>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 pb-4" v-for="article in filterArticles" :key="article.id" >
                    <b-card :title="article.title">
                        <b-card-text>
                            {{ article.text }}
                        </b-card-text>
                        <p>Comments: {{ article.comments_count }}</p>
                        <router-link :to="'/blog/article/'+article.slug">See</router-link>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions} from "vuex"

    export default {
        name: "Articles",
        data: () => {
            return {
                searchQuery: "",
                filter: "",
                sort: ""
            }
        },
        computed: {

            filterArticles() {
                let articles = this.$store.getters["blog/getArticles"] || [];

                let filtered = articles.filter(article => {
                    return article.title.toLowerCase().includes(this.filter.toLowerCase())
                });
                if(this.sort == "asc"){
                    filtered.sort((a, b) => a.title.localeCompare(b.title))
                } else if(this.sort == 'desc'){
                    filtered.sort((a, b) => b.title.localeCompare(a.title))
                }
                return filtered;
            }
        },

        created() {
            this.getArticles();
        },
        methods: {
            ...mapActions({
                getArticles: "blog/getArticles",
            }),
            search(){
                return [];
            }
        },
    }
</script>

<style scoped>
    .card-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
