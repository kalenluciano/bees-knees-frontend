<template>
    <div v-if="postDetails">
        <PostCard :post="postDetails" @handlePostChange="handlePostChange" />
        <div v-if="postDetails.comments">
            <div v-for="comment in postDetails.comments" :key="comment.id">
                <CommentCard :comment="comment" @handlePostChange="handlePostChange" />
            </div>
        </div>
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
        postDetails: null
    }),
    methods: {
        async getPostDetails() {
			const response = await axios.get(
				`${BASE_URL}/posts/${this.$route.params.post_id}/user/${this.userStore.user.id}`
			);
			this.postDetails = response.data;
			console.log(response.data);
		},
        handlePostChange(post, key, value) {
            console.log("post details", post, key, value)
			if (post.id === this.postDetails.id) {
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
		}
    },
    mounted: async function() {
        await this.getPostDetails()
    }
}
</script>

<style>

</style>