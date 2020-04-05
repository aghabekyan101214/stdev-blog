<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" class="form-control" required v-model="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" required v-model="password" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <button @click="submit" class="btn btn-primary">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex"

    export default {
        name: "signIn",
        data: () => {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            ...mapActions({
                signIn: 'auth/signIn',
            }),
            submit() {
                let form = new FormData();
                form.set("email", this.email)
                form.set("password", this.password)
                this.signIn(form).then(() => {
                    this.$router.push("/blog")
                }).catch(error => {
                    alert(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>
