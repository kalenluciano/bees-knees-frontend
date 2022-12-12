<template>
    <div>
        <RouterLink :to="{name: 'ProfilePage', params: {user_id: post.userId}}" name="ProfilePage">{{post.username}}</RouterLink>
        <p>{{post.content}}</p>
        <img :src="post?.media" />
        <p>{{post.updatedAt}}</p>
        <p>{{post.likesCount}}</p>
        <button class="like">Give Honey</button>
        <p>{{post.flagCount}}</p>
        <button class="dislike">Sting</button>
        <p>{{post.repostCount}}</p>
        <button class="repost">Repost</button>
    </div>
</template>

<script>
export default {
    name: 'PostCard',
    props: ['post']
}
</script>

<style>

</style>