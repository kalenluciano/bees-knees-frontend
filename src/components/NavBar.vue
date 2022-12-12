<template>
    <div>
        <nav v-if="user.authenticated">
            <RouterLink to="/" name="NewsFeed">The Buzz</RouterLink>
            <RouterLink to="/explore" name="ExplorePage">Pollination Station</RouterLink>
            <RouterLink :to="{name: 'ProfilePage', params: {user_id: user.user.id}}" name="ProfilePage">Profile</RouterLink>
            <RouterLink to="/" name="NewsFeed" @click="handleLogOut" >Log Out</RouterLink>
        </nav>
        <nav v-else >
            <RouterLink to="/login" name="LoginPage">Login</RouterLink>
            <RouterLink to="/sign-up" name="SignUp">Sign Up</RouterLink>
        </nav>
    </div>
</template>

<script>
import { useUserStore } from '../stores/UserStore'

export default {
    setup() {
        const user = useUserStore()
        return {user}
    },
    name: 'NavBar',
    methods: {
        handleLogOut() {
            this.user.setUser(null)
            this.user.setAuthenticated(false)
            localStorage.clear()
        }
    }
}
</script>

<style>

</style>