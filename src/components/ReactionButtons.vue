<template>
    <div class="reactions" v-if="post?.reactionId === 0">
        <div class="like">
            <p>{{post.likesCount}}</p>
            <div class="like-button">
                <img src="../assets/honey.png" />
                <button value="1" @click="reactToPost">Give Honey</button>
            </div>
        </div>
        <div class="dislike">
            <p>{{post.flagCount}}</p>
            <div class="dislike-button" >
                <img src="../assets/sting.webp"  />
                <button value="0" @click="reactToPost">Unsting</button>
            </div>
        </div>
    </div>
    <div class="reactions" v-else-if="post?.reactionId === 1">
        <div class="like">
            <p>{{post.likesCount}}</p>
            <div class="like-button" >
                <img src="../assets/honey.png" />
                <button value="1" @click="reactToPost">Take Honey</button>
            </div>
        </div>
        <div class="dislike">
            <p>{{post.flagCount}}</p>
            <div class="dislike-button" >
                <img src="../assets/sting.webp"  />
                <button value="0" @click="reactToPost">Sting</button>
            </div>
        </div>
    </div>
    <div class="reactions" v-else>
        <div class="like">
            <p>{{post.likesCount}}</p>
            <div class="like-button" >
                <img src="../assets/honey.png" />
                <button value="1" @click="reactToPost">Give Honey</button>
            </div>
        </div>
        <div class="dislike">
            <p>{{post.flagCount}}</p>
            <div class="dislike-button" >
                <img src="../assets/sting.webp"  />
                <button value="0" @click="reactToPost">Sting</button>
            </div>
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
                await this.deleteReaction(0)
                this.handlePostChange(this.post, 'flagCount', this.post.flagCount - 1)
                this.handlePostChange(this.post, 'reactionId', null)
                if (e.target.value === "1") {
                    await this.postReaction(1)
                    this.handlePostChange(this.post, 'likesCount', this.post.likesCount + 1)
                    this.handlePostChange(this.post, 'reactionId', 1)
                }
            }
            else if (this.post?.reactionId === 1) {
                await this.deleteReaction(1)
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
        async deleteReaction(reactionId) {
            await Client.delete(`${BASE_URL}/posts/${this.post.id}/reaction/${reactionId}/user/${this.userStore.user.id}/`)
        },
        handlePostChange(post, key, value) {
            this.$emit('handlePostChange', post, key, value)
        }
    }
}
</script>

<style>
/* * {
    border: 1px solid black
} */

.reactions {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.like, .dislike {
    display: flex;
    justify-content: center;
    align-items: center;
}

.like button, .dislike button {
    cursor: pointer;
    padding: .25rem;
    color: black;
    background-color: #F2DA02;
    transition: all 0.3s ease;
    border-radius: 5px;
}

.like-button button:hover, .dislike-button button:hover {
    color: white;
    background-color: #31495E;
}

.like-button, .like-button *, .dislike-button, .dislike-button * {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 30px;
    margin: 0 5px;
}

.like-button img, .dislike-button img {
    width: 25px;
    height: 25px;
}

@media screen and (max-width: 675px) {
    .like-button img, .dislike-button img {
        display: none;
    }

    .like-button button, .dislike-button button {
        font-size: small;
    }
}

</style>