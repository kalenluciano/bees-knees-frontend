<template>
    <div v-if="originalPost">
        <form @submit="handleSubmit">
            <label for="content">Content: </label>
            <input @input="handleChange" name="content" type="text" placeholder="What's buzzing in your mind?" :value="formValues.content" />
            <button>Post</button>
        </form>
        <RepostPostCard :post="originalPost" />
    </div>
</template>

<script>
import { useUserStore } from '../stores/UserStore';
import { BASE_URL } from '../globals';
import Client from '../services/api';
import axios from 'axios';
import RepostPostCard from '../components/RepostPostCard.vue';

export default {
    setup() {
        const userStore = useUserStore();
        return { userStore };
    },
    name: "RepostPage",
    components: { 
        RepostPostCard
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