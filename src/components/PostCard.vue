<template>
    <div>
        <h3>{{post.username}}</h3>
        <p>{{post.content}}</p>
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