<template>
    <div>
        <div v-if="originalPost">
            <PostCard :post="originalPost" @handlePostChange="handlePostChange"/>
        </div>
        <form @submit="handleSubmit">
            <label for="content">Content: </label>
            <input @input="handleChange" name="content" type="text" placeholder="What's buzzing in your mind?" :value="formValues.content" />
            <label for="media">Media: </label>
            <input @input="handleChange" name="media" type="text" placeholder="Add media here" :value="formValues.media"/>
            <button>Post</button>
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
            const response = await axios.get(`${BASE_URL}/posts/${this.$route.params.post_id}`)
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