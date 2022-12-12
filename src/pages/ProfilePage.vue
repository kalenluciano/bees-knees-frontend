<template>
    <div>
        <ProfileInfo />
        <div v-if="userPosts" >
            <div class="profile-feed-container" :key="post.id" v-for="post in userPosts">
                <PostCard :post="post" @handlePostChange="handlePostChange" />
            </div>
        </div>
    </div>
</template>

<script>
import PostCard from '../components/PostCard.vue';
import ProfileInfo from '../components/ProfileInfo.vue';
import axios from 'axios'
import { BASE_URL } from '../globals';

export default {
    name: 'ProfilePage',
    components: {
        ProfileInfo,
        PostCard
    },
    data: () => ({
        userPosts: null
    }),
    methods: {
        async getUserPosts() {
            const response = await axios.get(`${BASE_URL}/posts/user/${this.$route.params.user_id}`)
            this.userPosts = response.data
        },
        handlePostChange(post, key, value) {
            const postToChange = this.userPosts.filter((userPost) => userPost.id === post.id)[0]
            postToChange[key] = value
        }
    },
    mounted: function() {
        this.getUserPosts()
    }
}
</script>

<style>

</style>