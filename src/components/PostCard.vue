<template>
    <div>
        <div v-if="post?.content || post?.media">
            <div v-if="!updatePost">
                <RouterLink :to="{name: 'ProfilePage', params: {user_id: post.userId}}" name="ProfilePage">{{post.username}}</RouterLink>
                <div @click="navigateToPostDetails">
                    <p>{{post.content}}</p>
                </div>
                <div v-if="post?.media">
                    <RepostPostCard v-if="originalPost" :post="originalPost" />
                    <img v-else :src="post?.media" />
                </div>
                <p>{{post.updatedAt}}</p>
                <div>
                    <p>{{post.commentsCount}}</p>
                    <button @click="handleCommentClick">Comment</button>
                </div>
                <ReactionButtons :post="post" @handlePostChange="this.handlePostChange" />
                <div>
                    <p>{{post.repostCount}}</p>
                    <button class="repost" @click="handleRepostClick">Repost</button>
                </div>
            </div>
            <div v-if="userStore.user.id === post.userId">
                <div v-if="!deletePostConfirmation && !updatePost">
                    <button @click="navigateToUpdateForm(true)">Update</button>
                    <button @click="setDeletePostConfirmation(true)">Delete</button>
                </div>
                <div v-if="updatePost">
                    <UpdatePostForm :post="post" @handlePostChange="handlePostChange" @navigateToUpdateForm="navigateToUpdateForm" />
                </div>
                <div v-if="deletePostConfirmation" >
                    <p>Are you sure you want to exterminate your post?</p>
                    <p>This action can't be undone.</p>
                    <button @click="setDeletePostConfirmation(false)">Never Mind</button>
                    <button @click="deletePost">Delete</button>
                </div>
        </div>
        </div>
    </div>
</template>

<script>
import ReactionButtons from './ReactionButtons.vue';
import RepostPostCard from './RepostPostCard.vue';
import axios from 'axios';
import { BASE_URL } from '../globals';
import { useUserStore } from '../stores/UserStore';
import UpdatePostForm from './UpdatePostForm.vue';
import Client from '@/services/api';

export default {
    setup() {
        const userStore = useUserStore()
        return {userStore}
    },
    name: 'PostCard',
    props: ['post'],
    emits: ['handlePostChange'],
    components: {
        ReactionButtons,
        RepostPostCard,
        UpdatePostForm
    }, 
    data: () => ({
        originalPost: null,
        updatePost: false,
        deletePostConfirmation: false
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
        navigateToUpdateForm(state) {
            this.updatePost = state
        },
        setDeletePostConfirmation(state) {
            this.deletePostConfirmation = state
        },
        async deletePost() {
            const response = await Client.delete(`${BASE_URL}/posts/post/${this.post.id}`)
            this.handlePostChange(this.post, 'content', '')
            this.handlePostChange(this.post, 'media', '')
            this.deletePostConfirmation = false
            if (response.data?.postToDecrementComment) {
                const post = response.data.postToDecrementComment
                this.handlePostChange(post, 'commentsCount', post.commentsCount - 1 )
            }
            if (response.data?.postToDecrementRepost) {
                const post = response.data.postToDecrementRepost
                this.handlePostChange(post, 'repostCount', post.repostCount - 1)
            }
        }
    },
    mounted: function() {
        if (this.post?.media.includes(`${BASE_URL}`)) {
            this.getPostById()
        }
    }
}
</script>

<style>

</style>