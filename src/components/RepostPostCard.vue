<template>
    <div class="repost-card" v-if="post">
        <div @click="navigateToNewsFeed">
            <p>{{post?.username}}</p>
            <p>{{post?.content}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RepostPostCard',
    props: ['post'], 
    methods: {
        navigateToNewsFeed() {
            this.$router.push(`/post/${this.post.id}`)
        }
    }
}
</script>

<style>
.repost-card {
    justify-self: start;
}
</style>