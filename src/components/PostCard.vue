<template>
    <div class="post-card-container" v-if="post?.content || post?.media">
        <div v-if="!updatePost">
            <div class="post-user-info">
                <RouterLink :to="{name: 'ProfilePage', params: {user_id: post.userId}}" name="ProfilePage">{{post.username}}</RouterLink>
                <div v-if="userStore.user.id === post.userId">
                <div class="edit-post-tools" v-if="!deletePostConfirmation && !updatePost">
                    <button  id="update-post-button" @click="navigateToUpdateForm(true)"><img src="../assets/edit.svg"/></button>
                    <button @click="setDeletePostConfirmation(true)"><img src="../assets/trash.svg"/></button>
                </div>
                </div>
            </div>
            <div class="post-content" @click="navigateToPostDetails">
                <p>{{post.content}}</p>
            </div>
            <div class="post-media" v-if="post?.media">
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
        <div v-if="updatePost">
            <UpdatePostForm :post="post" @handlePostChange="handlePostChange" @navigateToUpdateForm="navigateToUpdateForm" />
        </div>
        <div class="delete-post-confirmation" v-if="deletePostConfirmation" >
            <p>Are you sure you want to exterminate your post?</p>
            <p>This action can't be undone.</p>
            <button @click="setDeletePostConfirmation(false)">Never Mind</button>
            <button @click="deletePost">Delete</button>
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
    border-bottom: 1px #31495E solid;
    padding: 10px;
    background-color: #F7F7F9;
    position: relative;
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

.delete-post-confirmation button, .comment-button button, .repost-button button {
    cursor: pointer;
    padding: .25rem;
    color: black;
    background-color: #F2DA02;
    transition: all 0.3s ease;
    border-radius: 5px;
}

.comment-button button:hover, .repost-button button:hover {
    color: white;
    background-color: #31495E;
}

.delete-post-confirmation button:hover {
    background-color: black;
    color: #F2DA02;
}

.comment-button img, .repost-button img {
    width: 25px;
    height: 25px;
}

.post-media {
    display: flex;
    margin: 0 10px 20px 10px;
}

.post-media img {
    width: 90%;
    height: 200px;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
}

.post-content {
    padding: 0 0 10px 0;
}

.posted-date {
    font-size: .75rem;
    margin: 0;
}

.post-user-info {
    display: grid;
    grid-template-columns: 70% 1fr;
    margin-bottom: -0.5rem;
}

.edit-post-tools {
    display: flex;
    justify-content: flex-end;
}

.edit-post-tools button {
    cursor: pointer;
    padding: .25rem;
    transition: all 0.3s ease;
    border-radius: 5px;
}

#update-post-button {
    margin: 0 5px;
}

.edit-post-tools button:hover {
    color: black;
    background-color: #F2DA02;
}

.edit-post-tools img {
    width: 10px;
}

.delete-post-confirmation {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #31495E;
    width: 100%;
    height: 100%;
    color: white;
    text-align: center;
}

.delete-post-confirmation button {
    margin: 10px;
}

@media screen and (max-width: 675px) {
    .comment-button img, .repost-button img {
        display: none;
    }

    .comment-button button, .repost-button button, .edit-post-tools button {
        font-size: small;
    }
}

</style>