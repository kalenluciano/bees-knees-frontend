<template>
    <div>
        <RouterLink :to="{name: 'ProfilePage', params: {user_id: post.userId}}" name="ProfilePage">{{post.username}}</RouterLink>
        <div @click="navigateToPostDetails">
            <p>{{post.content}}</p>
            <div v-if="checkImage">
                <RepostPostCard v-if="originalPost" :post="originalPost" />
                <img v-else :src="post?.media" />
            </div>
            <p>{{post.updatedAt}}</p>
        </div>
        <div>
            <p>{{post.commentsCount}}</p>
            <button @click="handleCommentClick">Comment</button>
        </div>
        <ReactionButtons :post="post" @handlePostChange="this.handlePostChange" />
        <div>
            <p>{{post.repostCount}}</p>
            <button class="repost" @click="handleRepostClick" >Repost</button>
        </div>
    </div>
</template>

<script>
import ReactionButtons from './ReactionButtons.vue';
import RepostPostCard from './RepostPostCard.vue';
import axios from 'axios';
import { BASE_URL } from '../globals';

export default {
    name: 'PostCard',
    props: ['post'],
    emits: ['handlePostChange'],
    components: {
        ReactionButtons,
        RepostPostCard
    }, 
    data: () => ({
        originalPost: null,
        checkImage: false
    }),
    methods: {
        handlePostChange(post, key, value) {
            this.$emit('handlePostChange', post, key, value)
        },
        handleCommentClick() {
            this.$router.push(`/comment/${this.post.id}`)
        },
        handleRepostClick() {
            this.$router.push(`/repost/${this.post.id}`)
        },
        navigateToPostDetails() {
            this.$router.push(`/post/${this.post.id}`)
        },
        async getPostById() {
            const response = await axios.get(`${this.post.media}`);
            this.originalPost = response.data;
        }, 
    },
    mounted: function() {
        if (this.post?.media.includes(`${BASE_URL}`)) {
            this.getPostById()
        }
        this.checkImage = true
    }
}
</script>

<style>

</style>