<template>
    <div v-if="comment">
        <PostCard :post="comment" @handlePostChange="handlePostChange" />
        <div v-if="comment?.comments">
            <div v-for="comment in comment.comments" :key="comment.id">
                <CommentCard :comment="comment" @handlePostChange="handlePostChange" />
            </div>
        </div>
    </div>
</template>

<script>
import CommentCard from './CommentCard.vue'
import PostCard from './PostCard.vue';

export default {
    name: 'CommentCard',
    components: {
        CommentCard,
        PostCard
    },
    props: ['comment'],
    methods: {
        handlePostChange(post, key, value) {
            console.log("comment card", post, key, value)
            this.$emit('handlePostChange', post, key, value)
        }
    }
}
</script>