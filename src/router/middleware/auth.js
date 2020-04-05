export default function auth ( {next} ) {

    if (null == localStorage.getItem("token")) {
        return next({
            name: 'Login'
        })
    }
    return next()
}
