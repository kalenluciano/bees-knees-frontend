<template>
    <div>
        <div class="post-card-container" v-if="post?.content || post?.media">
            <div v-if="!updatePost">
                <RouterLink :to="{name: 'ProfilePage', params: {user_id: post.userId}}" name="ProfilePage">{{post.username}}</RouterLink>
                <div class="post-content" @click="navigateToPostDetails">
                    <p>{{post.content}}</p>
                </div>
                <div v-if="post?.media">
                    <RepostPostCard v-if="originalPost" :post="originalPost" />
                    <img v-else :src="post?.media" />
                </div>
                <p class="posted-date">Posted: {{updatedAt}}</p>
                <div class="post-interactions">
                    <div class="repost">
                        <p>{{post.commentsCount}}</p>
                        <div class="comment-button" >
                            <img src="../assets/comment.svg" />
                            <button @click="handleCommentClick">Comment</button>
                        </div>
                    </div>
                    <ReactionButtons :post="post" @handlePostChange="this.handlePostChange" />
                    <div class="comment">
                        <p>{{post.repostCount}}</p>
                        <div class="repost-button" >
                            <img src="../assets/repost.svg" />
                            <button @click="handleRepostClick">Repost</button>
                        </div>
                    </div>
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
        deletePostConfirmation: false,
        updatedAt: null
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
        },
        convertDateToString(post) {
            const date = new Date(post.updatedAt)
            this.updatedAt = date.toDateString()
        }  
    },
    mounted: function() {
        if (this.post?.media.includes(`${BASE_URL}`)) {
            this.getPostById()
        }
        this.convertDateToString(this.post)
    }
}
</script>

<style>
.post-card-container {
    max-width: 1000px;
    border: 2px #31495E solid;
}

.post-card-container a {
    text-decoration: none;
    color: #31495E;
}

.post-content {
    cursor: pointer;
}

.post-interactions {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
}

.comment, .repost {
    display: flex;
    justify-content: center;
    align-items: center;
}

.comment-button, .comment-button *, .repost-button, .repost-button * {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 30px;
    margin: 0 5px;
}

.comment-button button, .repost-button button {
    cursor: pointer;
    padding: .25rem;
    color: black;
    background-color: #F2DA02;
    transition: all 0.3s ease;
}

.comment-button button:hover, .repost-button button:hover {
    color: white;
    background-color: #31495E;
}

.comment-button img, .repost-button img {
    width: 25px;
    height: 25px;
}

.posted-date {
    font-size: .75rem;
}

@media screen and (max-width: 675px) {
    .comment-button img, .repost-button img {
        display: none;
    }

    .comment-button button, .repost-button button {
        font-size: small;
    }
}

</style>