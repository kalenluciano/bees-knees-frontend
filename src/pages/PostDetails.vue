<template>
    <div v-if="postDetails?.content && !loading">
        <PostCard :post="postDetails" @handlePostChange="handlePostChange" />
        <div v-if="postDetails.comments">
            <div v-for="comment in postDetails.comments" :key="comment.id">
                <CommentCard :comment="comment" @handlePostChange="handlePostChange" />
            </div>
        </div>
    </div>
    <div v-else-if="loading">
        <h2 class="error-message">Loading content...</h2>
    </div>
    <div v-else>
        <h1>Post cannot be found.</h1>
        <h2>You wandered too far from the hive.</h2>
        <button @click="goHome">Return Home</button>
    </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '../globals';
import { useUserStore } from '../stores/UserStore';
import CommentCard from '../components/CommentCard.vue';
import PostCard from '../components/PostCard.vue'

export default {
    setup() {
        const userStore = useUserStore()
        return {userStore}
    },
    name: 'PostDetails',
    components: {
        CommentCard,
        PostCard
    },
    data: () => ({
        postDetails: null,
        loading: true
    }),
    methods: {
        async getPostDetails() {
            try {
                const response = await axios.get(
                    `${BASE_URL}/posts/${this.$route.params.post_id}/user/${this.userStore.user.id}`
                );
                this.postDetails = response.data;
                this.loading = false
            } catch (error) {
                this.loading = false
            }
		},
        handlePostChange(post, key, value) {
			if (post.id === this.postDetails.id) {
                if (!this.postDetails?.content) {
                    this.$router.push('/')
                }
				return (this.postDetails[key] = value);
			}
			const findComment = (comment, post, key, value) => {
				if (comment.id === post.id) {
					return (comment[key] = value);
				} else if (comment.comments.length <= 0) {
					return 'No matching comment and post';
				} else {
					comment.comments.map((comment) => {
						return findComment(comment, post, key, value);
					});
				}
			};
			if (this.postDetails.comments.length >= 0) {
				this.postDetails.comments.map((comment) => {
					return findComment(comment, post, key, value);
				});
			}
		},
        goHome() {
            this.$router.push('/')
        }
    },
    mounted: async function() {
        await this.getPostDetails()
    }
}
</script>

<style>

</style>