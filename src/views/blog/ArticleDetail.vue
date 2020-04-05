<template>
    <div>
        <div class="container pt-5">
            <div class="row">
                <div class="col-md-6">
                    <p>{{ article.title }}</p>
                    <p>{{ article.text }}</p>
                    Last 5 Comments
                    <ul>
                        <li v-for="comment in article.comments" :key="comment.id">{{ comment.comment }}</li>
                    </ul>
                    <p>Leave Comment</p>
                    <textarea class="form-control" v-model="comment"></textarea>
                    <div class="pt-3">
                        <button ref="btn" class="btn btn-primary d-none" @click="leaveComment">Comment...</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex"

    export default {
        name: "ArticleDetail",
        data: () => {
            return {
                comment: ""
            }
        },
        methods:{
            ...mapActions({
                getArticle: "blog/getArticles",
                commentBlog: "blog/comment"
            }),
            leaveComment(){
                let data = {
                    "article_id": this.article.id,
                    "comment": this.comment
                };
                this.commentBlog(data).then(() => {
                    alert("You have commented successfully");
                    this.$router.push("/blog")
                }).catch(e => {
                    alert(e)
                })
            }
        },
        computed:{
            ...mapGetters({
                article: "blog/getArticle"
            })
        },
        created() {
            let slug = "?slug=" + this.$route.params.slug;
            this.getArticle(slug).then(() => {
                this.$refs.btn.classList.remove("d-none")
            });
        }
    }
</script>

<style scoped>

</style>
