<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" class="form-control" required v-model="nickname" placeholder="Nickname">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" required v-model="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" required v-model="password" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" required v-model="confirm_password" placeholder="Confirm Password">
                    </div>
                    <div class="form-group">
                        <button ref="sub" @click="submit" class="btn btn-primary">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex"

    export default {
        name: "signUp",
        data: () => {
            return {
                nickname: "",
                email: "",
                password: "",
                confirm_password: ""
            }
        },
        methods: {
            submit() {
                let form = new FormData();
                form.set("nickname", this.nickname)
                form.set("email", this.email)
                form.set("password", this.password)
                form.set("confirm_password", this.confirm_password)
                this.$refs.sub.classList.add("d-none");
                this.signUp(form).then(() => {
                    this.$router.push("/blog")
                }).catch(error => {
                    this.$refs.sub.classList.add("d-block");
                    alert(error)
                })
            },
            ...mapActions({
                signUp: "auth/signUp"
            }),
        }
    }
</script>

<style scoped>

</style>
