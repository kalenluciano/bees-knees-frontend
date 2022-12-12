<template>
    <div>
        <h1>Explore</h1>
        <div v-if="discoverPosts" >
            <div class="explore-feed-container" :key="post.id" v-for="post in discoverPosts">
                <PostCard :post="post" />
            </div>
        </div>
    </div>
</template>

<script>
import PostCard from '../components/PostCard.vue';
import { useUserStore } from '../stores/UserStore';
import axios from 'axios'
import { BASE_URL } from '../globals';

export default {
    setup() {
        const userStore = useUserStore()
        return {userStore: userStore}
    },
    name: 'ExplorePage',
    components: {
        PostCard
    }, 
    data: () => ({
        discoverPosts: null
    }),
    methods: {
        async getAllPosts() {
            const response = await axios.get(`${BASE_URL}/posts/all/user/${this.userStore.user.id}`)
            this.discoverPosts = response.data
        }
    },
    mounted: function() {
        this.getAllPosts()
    }
}
</script>

<style>

</style>