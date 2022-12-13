<template>
    <div>
        <form @submit="handleSubmit">
            <label for="content">Content: </label>
            <input @input="handleChange" name="content" type="text" placeholder="What's buzzing in your mind?" :value="formValues.content" />
            <RepostPostCard v-if="originalPost" :post="originalPost" />
            <div v-else>
                <label for="media">Media: </label>
                <input @input="handleChange" name="media" type="text" placeholder="Add media here" :value="formValues.media"/>
            </div>
            <button>Update</button>
        </form>
        <button @click="goBack">Back</button>
        <p v-if="error">Looks like that email is already associated with another account.</p>
    </div>
</template>

<script>
import { BASE_URL } from '../globals'
import Client from '../services/api'
import axios from 'axios'
import RepostPostCard from './RepostPostCard.vue'

export default {
    name: 'UpdatePostForm',
    props: ['post'],
    emits: ['handlePostChange', 'navigateToUpdateForm'],
    components: {
        RepostPostCard
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
        handleChange(e) {
            this.formValues[e.target.name] = e.target.value
        },
        async handleSubmit(e) {
            e.preventDefault()
            const payload = await Client.put(`${BASE_URL}/posts/${this.post.id}`, {...this.formValues })
            this.formValues = {
                content: '',
                media: '',
            }
            if (payload === 'error') {
                this.error = true
            } else {
                this.error = false
                this.$emit('navigateToUpdateForm', false)
                this.$emit('handlePostChange', this.post, 'content', payload.data[1][0].content) 
                this.$emit('handlePostChange', this.post, 'media', payload.data[1][0].media) 
            }       
        },
        async getPostById() {
            const response = await axios.get(`${this.post.media}`);
            this.originalPost = response.data;
        },
        goBack() {
            this.$emit('navigateToUpdateForm', false)
        },
        updateForm() {
            this.formValues = {content: this.post.content, media: this.post.media}
        }
    },
    mounted: function() {
        this.updateForm()
        if (this.post?.media.includes(`${BASE_URL}`)) {
            this.getPostById()
        }
    }
}
</script>