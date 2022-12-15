<template>
    <form class="post-form" @submit="handleSubmit">
        <textarea @input="handleChange" name="content" type="text" placeholder="What's buzzing in your mind?" :value="formValues.content" />
        <div class="post-submission">
            <input @input="handleChange" name="media" type="text" placeholder="Add media here" :value="formValues.media"/>
            <button>Post</button>
        </div>
    </form>
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
.post-form {
    max-width: 1000px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    border: 2px #31495E solid;
    margin-bottom: 10px;
}

.post-form textarea {
    width: 99%;
    height: 100px;
}

.post-form textarea, .post-form input {
    border: none;
    overflow: auto;
    outline: none;
    resize: none;
}

.post-form input {
    width: 95%;
    background-color: #31495E;
    color: white
}

.post-form input::placeholder {
    color: white
}

.post-form button {
    border-bottom-right-radius: 5px;
    padding: .25rem 0;
    color: black;
    background-color: #F2DA02;
    transition: all 0.3s ease;
    cursor: pointer;
    width: 100%;
}

.post-form button:hover {
    color: #F2DA02;
    background-color: black;
}

.post-submission {
    width: 100%;
    display: grid;
    grid-template-columns: 4fr 1fr;
    background-color: #31495E;
}

@media screen and (min-width: 1000px) {
    .post-form {
        width: 1000px
    }
}

</style>