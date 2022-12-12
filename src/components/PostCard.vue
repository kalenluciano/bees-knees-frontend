<template>
    <div>
        <RouterLink :to="{name: 'ProfilePage', params: {user_id: post.userId}}" name="ProfilePage">{{post.username}}</RouterLink>
        <div @click="navigateToPostDetails">
            <p>{{post.content}}</p>
            <img :src="post?.media" />
            <p>{{post.updatedAt}}</p>
        </div>
        <div>
            <p>{{post.commentsCount}}</p>
            <button @click="handleCommentClick">Comment</button>
        </div>
        <ReactionButtons :post="post" @handlePostChange="this.handlePostChange" />
        <div>
            <p>{{post.repostCount}}</p>
            <button class="repost" @click="handleRepostClick" >Repost</button>
        </div>
    </div>
</template>

<script>
import ReactionButtons from './ReactionButtons.vue';

export default {
    name: 'PostCard',
    props: ['post'],
    components: {
        ReactionButtons
    }, 
    methods: {
        handlePostChange(post, key, value) {
            this.$emit('handlePostChange', post, key, value)
        },
        handleCommentClick() {
            console.log('Still need to bring user to comment page and then from there back to post details or news feed with new comment underneath')
        },
        handleRepostClick() {
            console.log("Need to bring user to repost form and then from there back to post details or news feed with new comment underneath")
        },
        navigateToPostDetails() {
            this.$router.push(`/post/${this.post.id}`)
        }
    }
}
</script>

<style>

</style>