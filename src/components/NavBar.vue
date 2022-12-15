<template>
    <div class="nav-container">
        <nav v-if="user.authenticated">
            <RouterLink to="/" name="NewsFeed"><img src="../assets/hive.png"/>The Buzz</RouterLink>
            <RouterLink to="/explore" name="ExplorePage"><img src="../assets/sunflower.png"/>Pollination Station</RouterLink>
            <RouterLink :to="{name: 'ProfilePage', params: {user_id: user.user.id}}" name="ProfilePage"><img id="bee-nav-icon" src="../assets/bee.png"/>Profile</RouterLink>
            <RouterLink to="/" name="NewsFeed" @click="handleLogOut"><img src="../assets/log-out.png"/>Log Out</RouterLink>
        </nav>
        <!-- <nav v-else >
            <RouterLink to="/login" name="LoginPage">Login</RouterLink>
            <RouterLink to="/sign-up" name="SignUp">Sign Up</RouterLink>
        </nav> -->
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
            this.$router.push('/login')
        }
    }
}
</script>

<style>
* {
    border: 1px solid black
}

nav {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-width: 1000px;
    height: 100px;
    background-color: #F2DA02;
}

nav a {
    font-size: small;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.3s ease;
    color: #31495E;
}

nav img {
    width: 50px;
    transition: all 0.3s ease
}

nav img:hover {
    width: 60px;
}

@media screen and (max-width: 450px) {
    nav a {
        font-size: x-small;
    }
}

</style>