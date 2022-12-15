<template>
    <div>
        <form class="update-post-form" @submit="handleSubmit">
            <textarea @input="handleChange" name="content" type="text" placeholder="What's buzzing in your mind?" :value="formValues.content" />
            <div class="update-post-submission">
                <RepostPostCard v-if="originalPost" :post="originalPost" />
                <div v-else>
                    <input @input="handleChange" name="media" type="text" placeholder="Add media here" :value="formValues.media"/>
                </div>
                <button>Update</button>
            </div>
        </form>
        <button class="update-post-back-button" @click="goBack">Back</button>
        <p v-if="error">Oops something went wrong. Please try again.</p>
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

<style>
.update-post-form {
    max-width: 1000px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    border: 2px #31495E solid;
}

.update-post-form textarea {
    width: 99%;
    height: 100px;
}

.update-post-form textarea, .update-post-form input {
    border: none;
    overflow: auto;
    outline: none;
    resize: none;
}

.update-post-form input {
    width: 95%;
    background-color: #31495E;
    color: white
}

.update-post-form input::placeholder {
    color: white
}

.update-post-form button, .update-post-back-button {
    border-bottom-right-radius: 5px;
    padding: .25rem 0;
    color: black;
    background-color: #F2DA02;
    transition: all 0.3s ease;
    cursor: pointer;
    width: 100%;
}

.update-post-form button:hover, .update-post-back-button:hover {
    color: #F2DA02;
    background-color: black;
}

.update-post-submission {
    width: 100%;
    display: grid;
    grid-template-columns: 4fr 1fr;
    background-color: #31495E;
}
</style>