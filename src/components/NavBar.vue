<template>
    <nav>
        <h1>Nav Bar</h1>
        <RouterLink to="/" name="NewsFeed">The Buzz</RouterLink>
        <RouterLink to="/explore" name="ExplorePage">Pollination Station</RouterLink>
        <RouterLink :to="{name: 'ProfilePage', params: {user_id: userId}}" name="ProfilePage">Profile</RouterLink>
        <RouterLink to="/login" name="LoginPage">Login</RouterLink>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    data: () => ({
        userId: 1,
    }),
    methods: {
        
    }
}
</script>

<style>

</style>