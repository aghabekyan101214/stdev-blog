<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
                <b-nav-item>Hello {{ user.nickname }}</b-nav-item>
                <b-nav-item to="/blog">Articles</b-nav-item>
                <b-nav-item to="/blog/create">Create Articles</b-nav-item>
                <b-nav-item-dropdown text="User" right>
                    <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>

        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"

    export default {
        name: "Blog",
        data: () => {
            return {
            }
        },
        computed: {
            ...mapGetters({
                user: "auth/getUser"
            })
        },
        methods: {
            logout() {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                this.$router.push("/sign-in");
            }
        }
    }
</script>

<style scoped>

</style>
