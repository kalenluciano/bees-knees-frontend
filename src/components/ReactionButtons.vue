<template>
    <div>
        <div v-if="post?.reactionId === 0">
            <p>{{post.likesCount}}</p>
            <button class="like" value="1" @click="reactToPost">Give Honey</button>
            <p>{{post.flagCount}}</p>
            <button class="dislike" value="0" @click="reactToPost">Unsting</button>
        </div>
        <div v-else-if="post?.reactionId === 1">
            <p>{{post.likesCount}}</p>
            <button class="like" value="1" @click="reactToPost">Take Back Honey</button>
            <p>{{post.flagCount}}</p>
            <button class="dislike" value="0" @click="reactToPost">Sting</button>
        </div>
        <div v-else>
            <p>{{post.likesCount}}</p>
            <button class="like" value="1" @click="reactToPost">Give Honey</button>
            <p>{{post.flagCount}}</p>
            <button class="dislike" value="0" @click="reactToPost">Sting</button>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../stores/UserStore';
import Client from '../services/api'
import { BASE_URL } from '../globals';

export default {
    setup() {
        const userStore = useUserStore()
        return {userStore}
    },
    name: 'ReactionButtons',
    props: ['post'],
    methods: {
        async reactToPost(e) {
            if (this.post?.reactionId === 0) {
                await this.deleteReaction()
                this.handlePostChange(this.post, 'flagCount', this.post.flagCount - 1)
                this.handlePostChange(this.post, 'reactionId', null)
                if (e.target.value === "1") {
                    await this.postReaction(1)
                    this.handlePostChange(this.post, 'likesCount', this.post.likesCount + 1)
                    this.handlePostChange(this.post, 'reactionId', 1)
                }
            }
            else if (this.post?.reactionId === 1) {
                await this.deleteReaction()
                this.handlePostChange(this.post, 'likesCount', this.post.likesCount - 1)
                this.handlePostChange(this.post, 'reactionId', null)
                if (e.target.value === "0") {
                    await this.postReaction(0)
                    this.handlePostChange(this.post, 'flagCount', this.post.flagCount + 1)
                    this.handlePostChange(this.post, 'reactionId', 0)
                }
            }
            else {
                if (e.target.value === "1") {
                    await this.postReaction(1)
                    this.handlePostChange(this.post, 'likesCount', this.post.likesCount + 1)
                    this.handlePostChange(this.post, 'reactionId', 1)
                }
                else {
                    await this.postReaction(0)
                    this.handlePostChange(this.post, 'flagCount', this.post.flagCount + 1)
                    this.handlePostChange(this.post, 'reactionId', 0)
                }
            }
        }, 
        async postReaction(reactionId) {
            await Client.post(`${BASE_URL}/posts/reaction/${this.post.id}`, {reactionId, userId: this.userStore.user.id })
        },
        async deleteReaction() {
            await Client.delete(`${BASE_URL}/posts/reaction/${this.post.id}/user/${this.userStore.user.id}`)
        },
        handlePostChange(post, key, value) {
            console.log("reaction buttons", post, key, value)
            this.$emit('handlePostChange', post, key, value)
        }
    }
}
</script>