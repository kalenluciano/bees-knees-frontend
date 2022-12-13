<template>
    <div v-if="post">
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
            this.$router.push(`/post/${this.$route.params.post_id}`)
        }
    }
}
</script>