<template>
    <div>
        <h1>News Feed</h1>
        <div v-if="followingPosts" >
            <div class="news-feed-container" :key="post.id" v-for="post in followingPosts">
                <PostCard :post="post" />
            </div>
        </div>
        <div v-else>
            <h2>No posts.</h2>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '../globals';
import PostCard from '../components/PostCard.vue';
import { useUserStore } from '../stores/UserStore';

export default {
    setup() {
        const user = useUserStore()
        return {user}
    },
    name: 'NewsFeed',
    components: {
        PostCard
    },
    data: () => ({
        followingPosts: null
    }),
    methods: {
        async getFollowingPosts() {
            console.log(this.user.user.id)
            const response = await axios.get(`${BASE_URL}/posts/followed-users/user/${this.user.user.id}`)
            this.followingPosts = response.data
            console.log(response.data)
        }
    },
    mounted: function() {
        this.getFollowingPosts()
    }
}
</script>

<style>

</style>