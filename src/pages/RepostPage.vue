<template>
    <div v-if="originalPost">
        <PostCard :post="originalPost" />
        <form class="repost-form" @submit="handleSubmit">
            <textarea @input="handleChange" name="content" type="text" placeholder="What's buzzing in your mind?" :value="formValues.content" />
            <button>Repost</button>
        </form>
    </div>
</template>

<script>
import { useUserStore } from '../stores/UserStore';
import { BASE_URL } from '../globals';
import Client from '../services/api';
import axios from 'axios';
import PostCard from '../components/PostCard.vue';

export default {
    setup() {
        const userStore = useUserStore();
        return { userStore };
    },
    name: "RepostPage",
    components: {
    PostCard
},
    data: () => ({
        originalPost: null,
        formValues: {
            content: ''
        }, 
        error: false
    }),
    methods: {
        async getPostById() {
            const response = await axios.get(`${BASE_URL}/posts/${this.$route.params.post_id}/user/${this.userStore.user.id}`);
            this.originalPost = response.data;
        },
        handleChange(e) {
            this.formValues[e.target.name] = e.target.value;
        },
        async handleSubmit(e) {
            e.preventDefault();
            const userId = this.userStore.user.id;
            const media = `${BASE_URL}/posts/${this.$route.params.post_id}/user/${this.userStore.user.id}`
            await Client.post(`${BASE_URL}/posts/repost/${this.$route.params.post_id}`, { ...this.formValues, media, userId });
            this.formValues = {
                content: ""
            };
            this.$router.push(`/`);
        }
    },
    mounted: function() {
        this.getPostById()
    }
}
</script>

<style>
.repost-form {
    max-width: 1000px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    border: 2px #31495E solid;
}

.repost-form textarea {
    width: 99%;
    height: 100px;
}

.repost-form textarea {
    border: none;
    overflow: auto;
    outline: none;
    resize: none;
}

.repost-form button {
    border-bottom-right-radius: 5px;
    padding: .25rem 0;
    color: black;
    background-color: #F2DA02;
    transition: all 0.3s ease;
    cursor: pointer;
    width: 100%;
}

.repost-form button:hover {
    color: #F2DA02;
    background-color: black;
}
</style>