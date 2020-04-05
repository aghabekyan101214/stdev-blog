import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import auth from './middleware/auth'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: 'Home' }
    },
    {
        path: '/sign-in',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (signIn.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "signIn" */ '../views/auth/signIn'),
        meta: { title: 'Sign in' }
    },
    {
        path: '/sign-up',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk (signUp.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "signUp" */ '../views/auth/signUp'),
        meta: { title: 'Sign Up' }
    },
    {
        path: '/blog',
        name: 'Blog',
        // route level code-splitting
        // this generates a separate chunk (blog.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "blog" */ '../views/blog/Blog'),
        meta: {
            title: 'Blog',
            middleware: [
                auth
            ],
        },
        children: [
            {
                path: '',
                name: "Articles",
                component: () => import(/* webpackChunkName: "articles" */ '../views/blog/Articles'),
                meta: { title: 'Articles',
                    middleware: [
                        auth
                    ],
                }
            },
            {
                path: 'create',
                name: "CreateBlog",
                component: () => import(/* webpackChunkName: "createBlog" */ '../views/blog/CreateBlog'),
                meta: { title: 'Create Article',
                    middleware: [
                        auth
                    ],
                }
            },
            {
                path: 'article/:slug',
                name: "articleDetail",
                component: () => import(/* webpackChunkName: "articleDetail" */ '../views/blog/ArticleDetail'),
                meta: { title: 'Articles',
                    middleware: [
                        auth
                    ],
                }
            },
        ]
    },

]

const router = new VueRouter({
    routes,
    mode: 'history',
});
router.beforeEach((to, from, next) => {
    document.title = "Blog | " + to.meta.title;
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
    }
    return middleware[0]({
        ...context
    })

});

export default router
