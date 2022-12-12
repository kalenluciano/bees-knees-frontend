<template>
    <div>
        <div v-if="userStore.user">
            <h1>News Feed</h1>
            <PostForm @getFollowingPosts="getFollowingPosts" />
            <div v-if="followingPosts && followingPostsLengthCheck" >
                <div class="news-feed-container" :key="post.id" v-for="post in followingPosts">
                    <PostCard :post="post" />
                </div>
            </div>
            <div v-else>
                <h2>No posts.</h2>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '../globals';
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm.vue'
import { useUserStore } from '../stores/UserStore';

export default {
    setup() {
        const userStore = useUserStore()
        return {userStore: userStore}
    },
    name: 'NewsFeed',
    components: {
        PostCard,
        PostForm,
    },
    data: () => ({
        followingPosts: null,
        followingPostsLengthCheck: false
    }),
    methods: {
        async getFollowingPosts() {
            const response = await axios.get(`${BASE_URL}/posts/followed-users/user/${this.userStore.user.id}`)
            this.followingPosts = response.data
            if (response.data.length > 0) {
                this.followingPostsLengthCheck = true
            }
            else {
                this.followingPostsLengthCheck = false
            } 
        }
    },
    mounted: function() {
        if (this.userStore.user) {
            this.getFollowingPosts()
        }
        else {
            this.$router.push('/login')
        }
    }
}
</script>

<style>

</style>