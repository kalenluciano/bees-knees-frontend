<template>
    <div>
        <div v-if="originalPost">
            <PostCard :post="originalPost" @handlePostChange="handlePostChange"/>
        </div>
        <form class="comment-post-form" @submit="handleSubmit">
            <textarea @input="handleChange" name="content" type="text" placeholder="What's buzzing in your mind?" :value="formValues.content" />
            <div class="comment-post-submission">
                <input @input="handleChange" name="media" type="text" placeholder="Add media here" :value="formValues.media"/>
                <button>Post</button>
            </div>
        </form>
    </div>
</template>

<script>
import { BASE_URL } from '@/globals';
import axios from 'axios';
import Client from '../services/api'
import PostCard from '../components/PostCard.vue';
import { useUserStore } from '../stores/UserStore';

export default {
    setup() {
        const userStore = useUserStore()
        return {userStore}
    },
    name: 'CommentPage',
    components: {
        PostCard
    }, 
    data: () => ({
        originalPost: null,
        formValues: {
            content: '',
            media: '',
        }, 
        error: false
    }),
    methods: {
        async getPostById() {
            const response = await axios.get(`${BASE_URL}/posts/${this.$route.params.post_id}/user/${this.userStore.user.id}`)
            this.originalPost = response.data
        },
        handlePostChange(post, key, value) {
            if (post.id === this.originalPost.id) {
                this.originalPost[key] = value
            }
        },
        handleChange(e) {
            this.formValues[e.target.name] = e.target.value
        },
        async handleSubmit(e) {
            e.preventDefault()
            const userId = this.userStore.user.id
            await Client.post(`${BASE_URL}/posts/comment/${this.$route.params.post_id}`, {...this.formValues, userId })
            this.formValues = {
                content: '',
                media: '',
            }
            this.$router.push(`/post/${this.$route.params.post_id}`)
        }
    }, 
    mounted: function() {
        this.getPostById()
    }
}
</script>

<style>
.comment-post-form {
    max-width: 1000px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    border: 2px #31495E solid;
}

.comment-post-form textarea {
    width: 99%;
    height: 100px;
}

.comment-post-form textarea, .comment-post-form input {
    border: none;
    overflow: auto;
    outline: none;
    resize: none;
}

.comment-post-form input {
    width: 95%;
    background-color: #31495E;
    color: white
}

.comment-post-form input::placeholder {
    color: white
}

.comment-post-form button {
    border-bottom-right-radius: 5px;
    padding: .25rem 0;
    color: black;
    background-color: #F2DA02;
    transition: all 0.3s ease;
    cursor: pointer;
    width: 100%;
}

.comment-post-form button:hover {
    color: #F2DA02;
    background-color: black;
}

.comment-post-submission {
    width: 100%;
    display: grid;
    grid-template-columns: 4fr 1fr;
    background-color: #31495E;
}
</style>