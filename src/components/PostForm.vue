<template>
    <div>
        <h1>Post Form</h1>
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
import { BASE_URL } from '../globals'
import Client from '../services/api'
import { useUserStore } from '../stores/UserStore'

export default {
    setup() {
        const userStore = useUserStore()
        return {userStore}
    },
    name: 'PostForm',
    data: () => ({
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
            const userId = this.userStore.user.id
            await Client.post(`${BASE_URL}/posts`, {...this.formValues, userId })
            this.formValues = {
                content: '',
                media: '',
            }
            this.$emit('getFollowingPosts')
        }
    }
}
</script>

<style>

</style>