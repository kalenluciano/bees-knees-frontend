<template>
    <nav>
        <h1>Nav Bar</h1>
        <RouterLink to="/" name="NewsFeed">The Buzz</RouterLink>
        <RouterLink v-if="user.authenticated" to="/explore" name="ExplorePage">Pollination Station</RouterLink>
        <RouterLink v-if="user.authenticated" :to="{name: 'ProfilePage', params: {user_id: user.user.id}}" name="ProfilePage">Profile</RouterLink>
        <RouterLink v-if="!user.authenticated" to="/login" name="LoginPage">Login</RouterLink>
        <RouterLink v-else to="/" name="NewsFeed" @click="handleLogOut" >Log Out</RouterLink>
    </nav>
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