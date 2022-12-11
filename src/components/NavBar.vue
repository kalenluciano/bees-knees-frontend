<template>
    <nav>
        <h1>Nav Bar</h1>
        <RouterLink to="/" name="NewsFeed">The Buzz</RouterLink>
        <RouterLink v-if="authenticated" to="/explore" name="ExplorePage">Pollination Station</RouterLink>
        <RouterLink v-if="authenticated" :to="{name: 'ProfilePage', params: {user_id: user.id}}" name="ProfilePage">Profile</RouterLink>
        <RouterLink v-if="!authenticated" to="/login" name="LoginPage">Login</RouterLink>
        <RouterLink v-else to="/" name="NewsFeed" @click="handleLogOut" >Log Out</RouterLink>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    props: ['user','authenticated'],
    data: () => ({}),
    methods: {
        handleLogOut() {
            this.$emit('handleLogOut')
        }
    }
}
</script>

<style>

</style>