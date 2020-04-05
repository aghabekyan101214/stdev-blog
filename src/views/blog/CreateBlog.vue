<template>
    <div>
        <div class="container pt-5">
            <div class="row">
                <div class="col-md-6">
                    <h2>Create Article</h2>
                    <div class="form-group">
                        <select class="form-control" v-model="category_id">
                            <option value="">Choose Category</option>
                            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Title" v-model="title">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" placeholder="Text" v-model="text"></textarea>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success" @click="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex"

    export default {
        name: "CreateBlog",
        data: () => {
            return {
                category_id: "",
                title: "",
                text: ""
            }
        },
        mounted() {
          this.getArticles()
        },
        methods: {
            ...mapActions({
                createArticle: "blog/createArticle",
                getArticles: "blog/getCategories"
            }),
            submit(){
                let data = {
                    category_id: this.category_id,
                    title: this.title,
                    text: this.text
                };
                this.createArticle(data).then(() => {
                    alert("You have created the article successfully");
                    this.$router.push("/blog");
                }).catch(e => {
                    alert(e)
                })
            }
        },
        computed: {
            ...mapGetters({
                categories: "blog/getCategories"
            })
        }
    }
</script>

<style scoped>

</style>
