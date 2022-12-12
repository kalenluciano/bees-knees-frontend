<template>
    <div>
        <RouterLink :to="{name: 'ProfilePage', params: {user_id: post.userId}}" name="ProfilePage">{{post.username}}</RouterLink>
        <p>{{post.content}}</p>
        <img :src="post?.media" />
        <p>{{post.updatedAt}}</p>
        <ReactionButtons :post="post" @handlePostChange="this.handlePostChange" />
        <div>
            <p>{{post.repostCount}}</p>
            <button class="repost">Repost</button>
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
        }
    }
}
</script>

<style>

</style>